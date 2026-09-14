const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

test('Data Integrity: models.ts exists and contains essential models', () => {
  const modelsFilePath = path.join(__dirname, '..', 'src', 'data', 'models.ts');
  assert.ok(fs.existsSync(modelsFilePath), 'models.ts must exist');

  const content = fs.readFileSync(modelsFilePath, 'utf8');

  // Verify key models are present
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

test('Scenarios: Real-world workload presets are defined', () => {
  const scenariosPath = path.join(__dirname, '..', 'src', 'data', 'scenarios.ts');
  assert.ok(fs.existsSync(scenariosPath), 'scenarios.ts must exist');

  const content = fs.readFileSync(scenariosPath, 'utf8');
  assert.ok(content.includes('cskh'), 'Must have CSKH preset');
  assert.ok(content.includes('content'), 'Must have content creation preset');
  assert.ok(content.includes('coding'), 'Must have coding preset');
});
