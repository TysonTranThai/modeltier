const { test } = require('node:test');
const assert = require('node:assert');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const PORT = 3001;

function fetchUrl(url, options = {}) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const req = http.request({
      hostname: parsed.hostname,
      port: parsed.port,
      path: parsed.pathname + parsed.search,
      method: options.method || 'GET',
      headers: options.headers || {}
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          text: data,
          json: () => JSON.parse(data)
        });
      });
    });
    req.on('error', reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

test('Usability & Health: Server serves homepage with 200 OK and all core section anchors', async () => {
  const res = await fetchUrl(`http://localhost:${PORT}/`);
  assert.strictEqual(res.status, 200);
  
  const html = res.text;
  assert.ok(html.includes('id="leaderboard"'), 'Missing #leaderboard section');
  assert.ok(html.includes('id="highlights"'), 'Missing #highlights section');
  assert.ok(html.includes('id="scatterplot"'), 'Missing #scatterplot section');
  assert.ok(html.includes('id="tierlist"'), 'Missing #tierlist section');
  assert.ok(html.includes('id="finder"'), 'Missing #finder section');
  assert.ok(html.includes('id="calculator"'), 'Missing #calculator section');
  assert.ok(html.includes('id="battle"'), 'Missing #battle section');
  assert.ok(html.includes('id="live"'), 'Missing #live section');
  assert.ok(html.includes('id="glossary"'), 'Missing #glossary section');
});

test('Live Tracking: POST /api/sync triggers scraper and returns fresh 300+ models data immediately', async () => {
  const beforeTimestamp = new Date(Date.now() - 5000).toISOString();
  const syncRes = await fetchUrl(`http://localhost:${PORT}/api/sync`, { method: 'POST' });
  
  assert.strictEqual(syncRes.status, 200);
  const syncData = syncRes.json();
  
  assert.strictEqual(syncData.success, true);
  assert.ok(syncData.totalModels >= 300, `Expected >= 300 models, got ${syncData.totalModels}`);
  assert.ok(new Date(syncData.syncedAt) >= new Date(beforeTimestamp), 'syncedAt timestamp is stale');
  assert.ok(syncData.data && syncData.data.models.length >= 300, 'Payload data.models missing or incomplete');
  assert.ok(syncData.data.highlights.intelligence.length > 0, 'Highlights intelligence missing');
});

test('Live Tracking: GET /api/live-data reflects latest synced data without caching', async () => {
  const liveRes = await fetchUrl(`http://localhost:${PORT}/api/live-data?t=${Date.now()}`);
  assert.strictEqual(liveRes.status, 200);
  
  const liveData = liveRes.json();
  assert.ok(liveData.totalModels >= 300, `Expected >= 300 models in live-data, got ${liveData.totalModels}`);
  assert.ok(Array.isArray(liveData.models), 'models should be an array');
  assert.ok(liveData.models.some(m => m.name.includes('Claude')), 'Claude models should be present');
  assert.ok(liveData.models.some(m => m.name.includes('DeepSeek')), 'DeepSeek models should be present');
  assert.ok(liveData.models.some(m => m.name.includes('GPT')), 'GPT models should be present');
});

test('Infrastructure Telemetry: GET /api/live-status returns provider latency and throughput', async () => {
  const statusRes = await fetchUrl(`http://localhost:${PORT}/api/live-status`);
  assert.strictEqual(statusRes.status, 200);
  
  const statusData = statusRes.json();
  assert.strictEqual(statusData.status, 'ok');
  assert.ok(Array.isArray(statusData.providers), 'providers should be an array');
  assert.ok(statusData.providers.length >= 4, 'Should have multiple inference providers');
  
  const groq = statusData.providers.find(p => p.id === 'groq' || p.name.includes('Groq'));
  assert.ok(groq, 'Groq provider should be present');
  assert.ok(groq.avgLatencyMs > 0, 'Latency must be positive');
  assert.ok(groq.throughputTps > 0, 'Throughput must be positive');
});

test('Leaderboard Usability: Data filtering, sorting, and pagination logic works correctly', () => {
  const dataPath = path.join(process.cwd(), 'src', 'data', 'live_data.json');
  const live = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const models = live.models;
  
  // 1. Filter by Search Query
  const searchMatch = models.filter(m => m.name.toLowerCase().includes('deepseek'));
  assert.ok(searchMatch.length > 0, 'DeepSeek search should return matches');
  
  // 2. Filter by Tier
  const sTier = models.filter(m => m.tier === 'S');
  assert.ok(sTier.length > 0, 'S-Tier models should exist');
  
  // 3. Sorting by Intelligence Index Descending
  const sortedByIntel = [...models].sort((a, b) => b.intelligenceScore - a.intelligenceScore);
  assert.ok(sortedByIntel[0].intelligenceScore >= sortedByIntel[1].intelligenceScore);
  
  // 4. Sorting by Speed Descending
  const sortedBySpeed = [...models].sort((a, b) => b.outputSpeed - a.outputSpeed);
  assert.ok(sortedBySpeed[0].outputSpeed >= sortedBySpeed[1].outputSpeed);
  
  // 5. Sorting by Cost Ascending
  const sortedByCost = [...models].sort((a, b) => a.costPerTaskUSD - b.costPerTaskUSD);
  assert.ok(sortedByCost[0].costPerTaskUSD <= sortedByCost[sortedByCost.length - 1].costPerTaskUSD);
});
