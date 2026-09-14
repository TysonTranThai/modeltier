const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

test('Data Integrity: models.ts exists and contains essential curated models', () => {
  const modelsFilePath = path.join(__dirname, '..', 'src', 'data', 'models.ts');
  assert.ok(fs.existsSync(modelsFilePath), 'models.ts must exist');

  const content = fs.readFileSync(modelsFilePath, 'utf8');

  const requiredModels = [
    'claude-3-7-sonnet',
    'deepseek-r1',
    'gpt-4o',
    'gemini-2-5-pro',
    'deepseek-v3',
    'gemini-2-5-flash',
    'gpt-4o-mini',
    'llama-3-3-70b'
  ];

  for (const modelId of requiredModels) {
    assert.ok(
      content.includes(`id: '${modelId}'`) || content.includes(`id: "${modelId}"`),
      `Model ${modelId} must be present in dataset`
    );
  }
});

test('Live Scraped Data: live_data.json exists and dynamically scales to all models on the source site (600+ models)', () => {
  const liveDataPath = path.join(__dirname, '..', 'src', 'data', 'live_data.json');
  assert.ok(fs.existsSync(liveDataPath), 'live_data.json must exist');

  const data = JSON.parse(fs.readFileSync(liveDataPath, 'utf8'));
  assert.ok(data.totalModels >= 600, `Expected all models from site (>= 600 models), got ${data.totalModels}`);
  assert.ok(Array.isArray(data.models) && data.models.length >= 600, 'Models array must contain all models from site');

  // Verify highlights datasets
  assert.ok(data.highlights.intelligence.length > 0, 'Highlights intelligence must have data');
  assert.ok(data.highlights.speed.length > 0, 'Highlights speed must have data');
  assert.ok(data.highlights.costPerTask.length > 0, 'Highlights costPerTask must have data');
});

test('Currency Rate: Exchange rate is positive and within realistic range', () => {
  const modelsFilePath = path.join(__dirname, '..', 'src', 'data', 'models.ts');
  const content = fs.readFileSync(modelsFilePath, 'utf8');
  
  const rateMatch = content.match(/USD_TO_VND_RATE\s*=\s*(\d+)/);
  assert.ok(rateMatch, 'USD_TO_VND_RATE should be defined');
  const rate = parseInt(rateMatch[1], 10);
  assert.ok(rate >= 24000 && rate <= 30000, `Rate ${rate} should be realistic for VND/USD`);
});

test('Glossary and Plain Language definitions exist', () => {
  const glossaryPath = path.join(__dirname, '..', 'src', 'data', 'glossary.ts');
  assert.ok(fs.existsSync(glossaryPath), 'glossary.ts must exist');

  const content = fs.readFileSync(glossaryPath, 'utf8');
  assert.ok(content.includes('token'), 'Must explain token');
  assert.ok(content.includes('speed'), 'Must explain speed');
  assert.ok(content.includes('ttft'), 'Must explain TTFT');
  assert.ok(content.includes('context-window'), 'Must explain context window');
});

test('Sync Status file is written and valid', () => {
  const statusPath = path.join(__dirname, '..', 'src', 'data', 'sync_status.json');
  assert.ok(fs.existsSync(statusPath), 'sync_status.json must exist');

  const status = JSON.parse(fs.readFileSync(statusPath, 'utf8'));
  assert.strictEqual(status.status, 'success');
  assert.ok(status.totalModels >= 300, 'Status should reflect 300+ models');
  assert.ok(status.syncedAt, 'Status should have syncedAt timestamp');
});
