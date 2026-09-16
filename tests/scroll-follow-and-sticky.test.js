const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

test('Sticky Sidebar Architecture: ProCloneWorkspace has stretch grid, h-full column, and sticky aside', () => {
  const wsPath = path.join(__dirname, '../src/components/clone/ProCloneWorkspace.tsx');
  assert.ok(fs.existsSync(wsPath), 'ProCloneWorkspace.tsx must exist');
  const content = fs.readFileSync(wsPath, 'utf8');

  // Must NOT have items-start on grid (which restricts sticky container height)
  assert.ok(!content.includes('items-start w-full max-w-full'), 'Grid must allow stretch alignment for sticky sidebar');

  // Left column must have h-full to stretch across workspace height
  assert.ok(content.includes('lg:col-span-3 h-full'), 'Left sidebar container must stretch to full workspace height');

  // Aside must have sticky top-28
  assert.ok(content.includes('sticky top-28'), 'Aside must have sticky top-28');

  // Workspace wrapper must use overflow-x-clip (not overflow-x-hidden which breaks sticky)
  assert.ok(content.includes('overflow-x-clip'), 'Workspace wrapper must use overflow-x-clip');
  assert.ok(!content.includes('min-h-screen py-10 transition-colors w-full max-w-full overflow-x-hidden'), 'Must not use overflow-x-hidden on workspace');
});

test('ScrollSpy Precision: ProCloneWorkspace uses getBoundingClientRect and tracks all 12 sections', () => {
  const wsPath = path.join(__dirname, '../src/components/clone/ProCloneWorkspace.tsx');
  const content = fs.readFileSync(wsPath, 'utf8');

  // Viewport tracking with getBoundingClientRect
  assert.ok(content.includes('getBoundingClientRect'), 'Must use getBoundingClientRect for reliable cross-browser viewport tracking');
  assert.ok(content.includes('activationOffset'), 'Must have activationOffset threshold');
  assert.ok(content.includes('isManualScrollingRef'), 'Must have manual scroll lock to prevent scroll jitter');

  // Mobile bar auto-centering
  assert.ok(content.includes('mobileBarRef'), 'Must have mobileBarRef for horizontal bar');
  assert.ok(content.includes('data-active'), 'Must have data-active attribute for active category pill');

  // All 12 nav sections
  const expectedSections = [
    'intelligence',
    'coding-agents',
    'media-leaderboards',
    'speech-leaderboards',
    'capability-indices',
    'intelligence-breakdown',
    'openness',
    'output-tokens',
    'price-and-cost',
    'speed',
    'providers',
    'leaderboard',
    'articles',
  ];

  for (const s of expectedSections) {
    assert.ok(content.includes(`id: '${s}'`), `Nav items must contain section '${s}'`);
  }
});

test('Navbar Scroll Following: Navbar implements activeNavSection tracking and scroll listener', () => {
  const navPath = path.join(__dirname, '../src/components/Navbar.tsx');
  assert.ok(fs.existsSync(navPath), 'Navbar.tsx must exist');
  const content = fs.readFileSync(navPath, 'utf8');

  assert.ok(content.includes('activeNavSection'), 'Navbar must have activeNavSection state');
  assert.ok(content.includes('handleScrollNav'), 'Navbar must have handleScrollNav listener');
  assert.ok(content.includes('isScrolled'), 'Navbar must track isScrolled for dynamic elevation');
});

test('Scroll Margins: All major anchors have scroll-mt-28 or higher to prevent navbar obscuring', () => {
  const pagePath = path.join(__dirname, '../src/app/page.tsx');
  const pageContent = fs.readFileSync(pagePath, 'utf8');
  const hlPath = path.join(__dirname, '../src/components/Highlights.tsx');
  const hlContent = fs.readFileSync(hlPath, 'utf8');
  assert.ok(hlContent.includes('id="highlights"') && hlContent.includes('scroll-mt-28'));
  assert.ok(pageContent.includes('id="scatterplot"') && pageContent.includes('scroll-mt-28'));

  const wsPath = path.join(__dirname, '../src/components/clone/ProCloneWorkspace.tsx');
  const wsContent = fs.readFileSync(wsPath, 'utf8');
  assert.ok(wsContent.includes('id="intelligence"') && wsContent.includes('scroll-mt-36 sm:scroll-mt-40 lg:scroll-mt-28'));
  assert.ok(wsContent.includes('id="articles"') && wsContent.includes('scroll-mt-36 sm:scroll-mt-40 lg:scroll-mt-28'));

  const secPath = path.join(__dirname, '../src/components/clone/CloneSections.tsx');
  const secContent = fs.readFileSync(secPath, 'utf8');
  assert.ok(secContent.includes('id="coding-agents"') && secContent.includes('scroll-mt-36 sm:scroll-mt-40 lg:scroll-mt-28'));
  assert.ok(secContent.includes('id="price-and-cost"') && secContent.includes('scroll-mt-36 sm:scroll-mt-40 lg:scroll-mt-28'));
  assert.ok(secContent.includes('id="speed"') && secContent.includes('scroll-mt-36 sm:scroll-mt-40 lg:scroll-mt-28'));
});

test('Root Container Overflow: page.tsx and globals.css do not break sticky with overflow-x-hidden', () => {
  const pagePath = path.join(__dirname, '../src/app/page.tsx');
  const pageContent = fs.readFileSync(pagePath, 'utf8');
  assert.ok(!pageContent.includes('<main className="flex-1 w-full max-w-full overflow-x-hidden">'), '<main> must not have overflow-x-hidden');
  assert.ok(pageContent.includes('overflow-x-clip'), '<main> must use overflow-x-clip');

  const cssPath = path.join(__dirname, '../src/app/globals.css');
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  assert.ok(cssContent.includes('overflow-x: clip;'), 'globals.css must use overflow-x: clip;');
});
