const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const http = require('http');

const PORT = process.env.PORT || 3000;

function fetchUrl(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          text: data,
        });
      });
    });
    req.on('error', reject);
    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

// -------------------------------------------------------------
// LAYER 1: VIEWPORT & STICKY ARCHITECTURE
// -------------------------------------------------------------
test('LAYER 1: Sticky Architecture - Root containers allow full-height stickiness without scroll capture', () => {
  const wsPath = path.join(__dirname, '../src/components/clone/ProCloneWorkspace.tsx');
  const wsContent = fs.readFileSync(wsPath, 'utf8');
  assert.ok(!wsContent.includes('items-start'), 'Grid must NOT have items-start, allowing sidebar column to stretch full height');
  assert.ok(wsContent.includes('lg:col-span-3 h-full'), 'Left sidebar column must have h-full to stretch across ~15,000px workspace');
  assert.ok(wsContent.includes('sticky top-28'), 'Sidebar aside must stick at top-28 (112px)');
  assert.ok(wsContent.includes('overflow-x-clip'), 'Workspace must use overflow-x-clip to prevent horizontal overflow without breaking sticky');

  const cssPath = path.join(__dirname, '../src/app/globals.css');
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  assert.ok(cssContent.includes('overflow-x: clip;'), 'globals.css must use overflow-x: clip;');
  assert.ok(!cssContent.includes('overflow-x: hidden;'), 'globals.css must not use overflow-x: hidden which disables sticky in WebKit/Blink');
});

// -------------------------------------------------------------
// LAYER 2: REAL-TIME SCROLLSPY ENGINE
// -------------------------------------------------------------
test('LAYER 2: ScrollSpy Engine - Bulletproof viewport tracking with getBoundingClientRect and maxTop', () => {
  const wsPath = path.join(__dirname, '../src/components/clone/ProCloneWorkspace.tsx');
  const wsContent = fs.readFileSync(wsPath, 'utf8');
  assert.ok(wsContent.includes('getBoundingClientRect()'), 'Must use getBoundingClientRect for absolute viewport coordinates');
  assert.ok(wsContent.includes('rect.top <= activationOffset && rect.top > maxTop'), 'Must use maxTop logic to guarantee closest active section');
  assert.ok(wsContent.includes('window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60'), 'Must have bottom-of-page trigger');
  assert.ok(wsContent.includes('isManualScrollingRef'), 'Must have manual scroll lock to prevent scroll indicator jitter');
});

// -------------------------------------------------------------
// LAYER 3: TOP NAVBAR SCROLL-FOLLOWING & ELEVATION
// -------------------------------------------------------------
test('LAYER 3: Navbar Following - Dynamic elevation, glow hairline, and DOM-ordered active tracking', () => {
  const navPath = path.join(__dirname, '../src/components/Navbar.tsx');
  const navContent = fs.readFileSync(navPath, 'utf8');
  assert.ok(navContent.includes('activeNavSection'), 'Navbar must track activeNavSection');
  assert.ok(navContent.includes('isScrolled'), 'Navbar must track isScrolled');
  assert.ok(navContent.includes('shadow-glow-orange') || navContent.includes('shadow-[0_12px_36px_rgba(0,0,0,0.85)]'), 'Navbar must have elevation shadow');

  // Verify Pro links ordering matches DOM
  const cloneLinksBlock = navContent.slice(
    navContent.indexOf('const cloneNavLinks ='),
    navContent.indexOf('const currentNavLinks =')
  );
  const intelligenceIdx = cloneLinksBlock.indexOf('#intelligence');
  const codingAgentsIdx = cloneLinksBlock.indexOf('#coding-agents');
  const costIdx = cloneLinksBlock.indexOf('#price-and-cost');
  const speedIdx = cloneLinksBlock.indexOf('#speed');
  const providersIdx = cloneLinksBlock.indexOf('#providers');
  const leaderboardIdx = cloneLinksBlock.indexOf('#leaderboard');

  assert.ok(intelligenceIdx < codingAgentsIdx, 'intelligence must come before coding-agents');
  assert.ok(codingAgentsIdx < costIdx, 'coding-agents must come before price-and-cost');
  assert.ok(costIdx < speedIdx, 'price-and-cost must come before speed');
  assert.ok(speedIdx < providersIdx, 'speed must come before providers');
  assert.ok(providersIdx < leaderboardIdx, 'providers must come before leaderboard');
});

// -------------------------------------------------------------
// LAYER 4: MOBILE & IPAD CATEGORY NAVIGATION
// -------------------------------------------------------------
test('LAYER 4: Mobile & iPad Category Navigation - Auto-centering and sticky placement', () => {
  const wsPath = path.join(__dirname, '../src/components/clone/ProCloneWorkspace.tsx');
  const wsContent = fs.readFileSync(wsPath, 'utf8');
  assert.ok(wsContent.includes('ref={mobileBarRef}'), 'Mobile bar must attach mobileBarRef');
  assert.ok(wsContent.includes('scrollIntoView'), 'Mobile bar must call scrollIntoView to auto-center active pill');
  assert.ok(wsContent.includes("inline: 'center'"), 'Mobile bar must center active item horizontally');
  assert.ok(wsContent.includes('sticky top-[72px] sm:top-[76px]'), 'Mobile bar must stick cleanly beneath top navbar');
});

// -------------------------------------------------------------
// LAYER 5: SAFE SCROLL MARGINS (ZERO HEADER CLIPPING)
// -------------------------------------------------------------
test('LAYER 5: Scroll Margins - All page sections have at least 112px headroom', () => {
  const sectionsToCheck = [
    { file: '../src/components/Highlights.tsx', id: 'highlights', minMargin: 'scroll-mt-28' },
    { file: '../src/components/TierList.tsx', id: 'tierlist', minMargin: 'scroll-mt-28' },
    { file: '../src/components/ModelRecommender.tsx', id: 'finder', minMargin: 'scroll-mt-28' },
    { file: '../src/components/CostCalculator.tsx', id: 'calculator', minMargin: 'scroll-mt-28' },
    { file: '../src/components/ModelBattle.tsx', id: 'battle', minMargin: 'scroll-mt-28' },
    { file: '../src/components/ModelLeaderboard.tsx', id: 'leaderboard', minMargin: 'scroll-mt-28' },
    { file: '../src/components/LiveTracker.tsx', id: 'live', minMargin: 'scroll-mt-28' },
    { file: '../src/components/PlainExplainer.tsx', id: 'glossary', minMargin: 'scroll-mt-28' },
    { file: '../src/components/clone/ProCloneWorkspace.tsx', id: 'intelligence', minMargin: 'scroll-mt-28' },
    { file: '../src/components/clone/CloneSections.tsx', id: 'coding-agents', minMargin: 'scroll-mt-28' },
    { file: '../src/components/clone/CloneSections.tsx', id: 'price-and-cost', minMargin: 'scroll-mt-28' },
    { file: '../src/components/clone/CloneSections.tsx', id: 'speed', minMargin: 'scroll-mt-28' },
    { file: '../src/components/clone/CloneSections.tsx', id: 'providers', minMargin: 'scroll-mt-28' },
    { file: '../src/components/clone/ProCloneWorkspace.tsx', id: 'articles', minMargin: 'scroll-mt-28' },
  ];

  for (const s of sectionsToCheck) {
    const filePath = path.join(__dirname, s.file);
    assert.ok(fs.existsSync(filePath), `File ${s.file} must exist`);
    const content = fs.readFileSync(filePath, 'utf8');
    assert.ok(content.includes(s.id), `${s.file} must define #${s.id}`);
    assert.ok(content.includes(s.minMargin), `${s.file} #${s.id} must have ${s.minMargin} to prevent navbar clipping`);
  }
});

// -------------------------------------------------------------
// LAYER 6: DOM UNIQUE ANCHOR IDS
// -------------------------------------------------------------
test('LAYER 6: DOM IDs - Zero duplicate IDs across rendered page components', () => {
  const pagePath = path.join(__dirname, '../src/app/page.tsx');
  const pageContent = fs.readFileSync(pagePath, 'utf8');
  assert.ok(!pageContent.includes('<div id="highlights"'), 'page.tsx must not duplicate id="highlights"');
  assert.ok(!pageContent.includes('<div id="benchmarks"'), 'page.tsx must not duplicate id="benchmarks"');

  const wsPath = path.join(__dirname, '../src/components/clone/ProCloneWorkspace.tsx');
  const wsContent = fs.readFileSync(wsPath, 'utf8');
  assert.ok(wsContent.includes('<ModelLeaderboard\n                id=""') || wsContent.includes('id=""'), 'ProCloneWorkspace must pass empty id to child leaderboard');
  assert.ok(wsContent.includes('<LiveTracker id="" />'), 'ProCloneWorkspace must pass empty id to child LiveTracker');

  const artPath = path.join(__dirname, '../src/components/ArticlesAndChangelog.tsx');
  const artContent = fs.readFileSync(artPath, 'utf8');
  assert.ok(!artContent.includes('<section id="articles"'), 'ArticlesAndChangelog must not duplicate id="articles"');
});

// -------------------------------------------------------------
// LAYER 7: CURRENCY FORMATTER & DYNAMIC PRICING
// -------------------------------------------------------------
test('LAYER 7: Currency Formatter - Pro Clone tables respond to currency toggle', () => {
  const secPath = path.join(__dirname, '../src/components/clone/CloneSections.tsx');
  const secContent = fs.readFileSync(secPath, 'utf8');
  assert.ok(secContent.includes('useCurrency()'), 'CloneSections must import and call useCurrency()');
  assert.ok(secContent.includes('formatCost(item.costUSD)'), 'Coding agent table must format cost dynamically');
  assert.ok(secContent.includes('formatCost(m.inUSD)'), 'Cost table must format input cost dynamically');
  assert.ok(secContent.includes('formatCost(m.outUSD)'), 'Cost table must format output cost dynamically');
  assert.ok(secContent.includes('formatCost(m.cacheUSD)'), 'Cost table must format cache cost dynamically');
  assert.ok(secContent.includes('formatCost(m.taskUSD)'), 'Cost table must format task cost dynamically');
});

// -------------------------------------------------------------
// LAYER 8: LIVE API TELEMETRY & SCRAPER HEALTH
// -------------------------------------------------------------
test('LAYER 8: Live API Telemetry - Endpoints return 200 OK with valid schemas', async () => {
  // 1. live-status
  const statusRes = await fetchUrl(`http://localhost:${PORT}/api/live-status`);
  assert.strictEqual(statusRes.status, 200, 'live-status must return 200 OK');
  const statusData = JSON.parse(statusRes.text);
  assert.strictEqual(statusData.status, 'ok');
  assert.ok(Array.isArray(statusData.providers) && statusData.providers.length >= 4, 'Must return at least 4 cloud providers');

  // 2. live-data
  const dataRes = await fetchUrl(`http://localhost:${PORT}/api/live-data`);
  assert.strictEqual(dataRes.status, 200, 'live-data must return 200 OK');
  const liveData = JSON.parse(dataRes.text);
  assert.ok(liveData.totalModels >= 50, 'live-data must report at least 50 models');
  assert.ok(Array.isArray(liveData.models) && liveData.models.length >= 50, 'live-data must have models array');

  // 3. models API
  const modelsRes = await fetchUrl(`http://localhost:${PORT}/api/models?tier=S`);
  assert.strictEqual(modelsRes.status, 200, 'models API must return 200 OK');
  const modelsData = JSON.parse(modelsRes.text);
  assert.ok(modelsData.total > 0, 'Must return S-tier models');

  // 4. recommend API
  const recRes = await fetchUrl(`http://localhost:${PORT}/api/recommend`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ useCase: 'coding', budget: 'normal', priority: 'smartest' }),
  });
  assert.strictEqual(recRes.status, 200, 'recommend API must return 200 OK');
  const recData = JSON.parse(recRes.text);
  assert.ok(Array.isArray(recData.recommendations) && recData.recommendations.length > 0, 'Must return recommendations');
});

// -------------------------------------------------------------
// LAYER 9: HIGH-FIDELITY COMPANY LOGOS & BRAND PALETTE
// -------------------------------------------------------------
test('LAYER 9: Company Logos & Brand Palette - SVG icons and brand colors for all frontier labs', () => {
  const logoPath = path.join(__dirname, '../src/components/clone/CompanyLogo.tsx');
  const logoContent = fs.readFileSync(logoPath, 'utf8');

  const requiredLabs = [
    'anthropic',
    'openai',
    'google',
    'meta',
    'deepseek',
    'alibaba',
    'xai',
    'cognition',
    'mistral',
    'nvidia',
  ];

  for (const lab of requiredLabs) {
    assert.ok(logoContent.toLowerCase().includes(lab), `CompanyLogo must support ${lab}`);
  }
});

// -------------------------------------------------------------
// LAYER 10: PRODUCTION BUNDLE & SERVER HEALTH
// -------------------------------------------------------------
test('LAYER 10: Production Bundle & Server Health - Clean 200 response with both mode architectures', async () => {
  const res = await fetchUrl(`http://localhost:${PORT}/`);
  assert.strictEqual(res.status, 200, 'Server must return 200 OK');
  assert.ok(res.text.includes('ModelTier') || res.text.includes('Model'), 'Server must serve branded ModelTier HTML');
  assert.ok(res.text.includes('scroll-mt-28') || res.text.includes('scroll-mt-36'), 'HTML must include standardized scroll margins');
});

// -------------------------------------------------------------
// DOMAIN CONFIGURATION: modeltier.notlimitedteam.cloud
// -------------------------------------------------------------
test('Domain Configuration: modeltier.notlimitedteam.cloud is configured across sitemap, robots, layout, and footer', () => {
  const expectedDomain = 'modeltier.notlimitedteam.cloud';

  const layoutPath = path.join(__dirname, '../src/app/layout.tsx');
  const layoutContent = fs.readFileSync(layoutPath, 'utf8');
  assert.ok(layoutContent.includes(`https://${expectedDomain}`), 'layout.tsx must configure metadataBase and canonical with new domain');

  const sitemapPath = path.join(__dirname, '../src/app/sitemap.ts');
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  assert.ok(sitemapContent.includes(`https://${expectedDomain}`), 'sitemap.ts must contain new domain');

  const robotsPath = path.join(__dirname, '../src/app/robots.ts');
  const robotsContent = fs.readFileSync(robotsPath, 'utf8');
  assert.ok(robotsContent.includes(`https://${expectedDomain}/sitemap.xml`), 'robots.ts must reference sitemap with new domain');

  const footerPath = path.join(__dirname, '../src/components/Footer.tsx');
  const footerContent = fs.readFileSync(footerPath, 'utf8');
  assert.ok(footerContent.includes(expectedDomain), 'Footer.tsx must display new domain in copyright');

  const i18nPath = path.join(__dirname, '../src/data/i18n.ts');
  const i18nContent = fs.readFileSync(i18nPath, 'utf8');
  assert.ok(i18nContent.includes(expectedDomain), 'i18n.ts must reference new domain in copyright strings');
});
