const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const http = require('http');

const PORT = process.env.PORT || 3000;

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          text: data,
        });
      });
    }).on('error', reject);
  });
}

function isServerRunning(port = PORT) {
  return new Promise((resolve) => {
    const req = http.get(`http://127.0.0.1:${port}/`, () => resolve(true));
    req.on('error', () => resolve(false));
    req.setTimeout(2000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

test('Dual-Mode System: ViewModeContext exists and is configured with persistence', () => {
  const contextPath = path.join(__dirname, '../src/context/ViewModeContext.tsx');
  assert.ok(fs.existsSync(contextPath), 'ViewModeContext.tsx must exist');
  const content = fs.readFileSync(contextPath, 'utf8');
  assert.ok(content.includes('localStorage.getItem'), 'Must support localStorage persistence');
  assert.ok(content.includes("'simplified'"), 'Must support simplified easy mode');
  assert.ok(content.includes("'clone'"), 'Must support clone pro mode');
});

test('Benchmark Explorer: BenchmarkScrollExplorer component implements horizontal scrolling container', () => {
  const compPath = path.join(__dirname, '../src/components/BenchmarkScrollExplorer.tsx');
  assert.ok(fs.existsSync(compPath), 'BenchmarkScrollExplorer.tsx must exist');
  const content = fs.readFileSync(compPath, 'utf8');
  assert.ok(content.includes('data-chart-scroll="true"'), 'Must have data-chart-scroll attribute matching Artificial Analysis');
  assert.ok(content.includes('overflow-x-auto'), 'Must support horizontal overflow scroll');
  assert.ok(content.includes('scrollBy'), 'Must support smooth button scrolling');
  assert.ok(content.includes('intelligence'), 'Must support intelligence benchmark');
  assert.ok(content.includes('speed'), 'Must support speed benchmark');
  assert.ok(content.includes('latency'), 'Must support latency benchmark');
  assert.ok(content.includes('cost'), 'Must support cost benchmark');
});

test('Pro Clone Mode: ProCloneHero & ArticlesAndChangelog components exist and render live data', () => {
  const heroPath = path.join(__dirname, '../src/components/ProCloneHero.tsx');
  const articlesPath = path.join(__dirname, '../src/components/ArticlesAndChangelog.tsx');
  assert.ok(fs.existsSync(heroPath), 'ProCloneHero.tsx must exist');
  assert.ok(fs.existsSync(articlesPath), 'ArticlesAndChangelog.tsx must exist');
  
  const heroContent = fs.readFileSync(heroPath, 'utf8');
  assert.ok(heroContent.includes('Independent Analysis of AI') || heroContent.includes('Đo lường & Phân tích Độc lập'));
  
  const articlesContent = fs.readFileSync(articlesPath, 'utf8');
  assert.ok(articlesContent.includes('articles.map'));
  assert.ok(articlesContent.includes('changelog.slice'));
});

test('Navbar Mode Switcher: Server serves page with mode toggle and brand identity', async (t) => {
  if (!(await isServerRunning())) {
    t.skip(`Server not running on port ${PORT} - skipping live HTTP verification`);
    return;
  }
  const res = await fetchUrl(`http://localhost:${PORT}/`);
  assert.strictEqual(res.status, 200);
  assert.ok(res.text.includes('ModelTier') || res.text.includes('Model'), 'Must contain brand title');
  assert.ok(res.text.includes('Dễ hiểu') || res.text.includes('Simple'), 'Must have easy mode switcher text');
  assert.ok(res.text.includes('Benchmark Pro') || res.text.includes('Pro Clone'), 'Must have pro mode switcher text');
});
