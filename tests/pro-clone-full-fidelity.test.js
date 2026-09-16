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

test('Pro Clone Architecture: ProCloneWorkspace exists with all 11 sidebar index categories', () => {
  const wsPath = path.join(__dirname, '../src/components/clone/ProCloneWorkspace.tsx');
  assert.ok(fs.existsSync(wsPath), 'ProCloneWorkspace.tsx must exist');
  const content = fs.readFileSync(wsPath, 'utf8');

  const requiredSections = [
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
    'providers'
  ];

  for (const s of requiredSections) {
    assert.ok(content.includes(s), `ProCloneWorkspace must include #${s} section`);
  }
});

test('Pro Clone Intelligence Card: Replicates exact UI from user screenshot (media_1789360263701.png)', () => {
  const cardPath = path.join(__dirname, '../src/components/clone/IntelligenceIndexCard.tsx');
  assert.ok(fs.existsSync(cardPath), 'IntelligenceIndexCard.tsx must exist');
  const content = fs.readFileSync(cardPath, 'utf8');

  // Title and description
  assert.ok(content.includes('Artificial Analysis Intelligence Index'), 'Must contain evaluation title');
  assert.ok(content.includes('incorporates 10 evaluations'), 'Must contain 10 evaluations description');
  assert.ok(content.includes('AA-Briefcase'), 'Must mention AA-Briefcase');

  // Controls & Toolbar
  assert.ok(content.includes('of {models.length} models') || content.includes('models'), 'Must have model count selector');
  assert.ok(content.includes('Add model from specific provider'), 'Must have Add model button');
  assert.ok(content.includes('Artificial Analysis'), 'Must have branding logo');

  // Bar chart & styling
  assert.ok(content.includes('getCreatorColor'), 'Must color bars with company brand colors');
  assert.ok(content.includes('CompanyLogo'), 'Must render company logos beneath bars');
  assert.ok(content.includes('-rotate-45'), 'Must render 45-degree angled labels');

  // 4 Bottom Sub-tabs
  assert.ok(content.includes('Open Weights / Proprietary'), 'Must have Open Weights / Proprietary tab');
  assert.ok(content.includes('Reasoning / Non-Reasoning'), 'Must have Reasoning / Non-Reasoning tab');
  assert.ok(content.includes('Text Only / Multimodal Inputs'), 'Must have Text Only / Multimodal Inputs tab');
  assert.ok(content.includes('By Country'), 'Must have By Country tab');
});

test('Pro Clone Sections: CloneSections.tsx defines detailed evaluations for all benchmark categories', () => {
  const secPath = path.join(__dirname, '../src/components/clone/CloneSections.tsx');
  assert.ok(fs.existsSync(secPath), 'CloneSections.tsx must exist');
  const content = fs.readFileSync(secPath, 'utf8');

  assert.ok(content.includes('Coding Agent Index'), 'Must have Coding Agent Index section');
  assert.ok(content.includes('Image &amp; Video') || content.includes('Image & Video'), 'Must have Image & Video section');
  assert.ok(content.includes('Speech'), 'Must have Speech section');
  assert.ok(content.includes('Capability Indices'), 'Must have Capability Indices section');
  assert.ok(content.includes('Openness Index'), 'Must have Openness Index section');
  assert.ok(content.includes('Output Tokens'), 'Must have Output Tokens section');
  assert.ok(content.includes('Speed &amp; Latency') || content.includes('Speed & Latency'), 'Must have Speed & Latency section');
  assert.ok(content.includes('Providers'), 'Must have Providers section');
});

test('Company Logos: CompanyLogo.tsx provides SVG icons and brand colors for all frontier labs', () => {
  const logoPath = path.join(__dirname, '../src/components/clone/CompanyLogo.tsx');
  assert.ok(fs.existsSync(logoPath), 'CompanyLogo.tsx must exist');
  const content = fs.readFileSync(logoPath, 'utf8');

  assert.ok(content.toLowerCase().includes('anthropic'), 'Must support Anthropic');
  assert.ok(content.toLowerCase().includes('openai'), 'Must support OpenAI');
  assert.ok(content.toLowerCase().includes('meta'), 'Must support Meta');
  assert.ok(content.toLowerCase().includes('google'), 'Must support Google');
  assert.ok(content.toLowerCase().includes('deepseek'), 'Must support DeepSeek');
});

test('Server Serving: Server responds with 200 OK and supports both Easy Mode and Pro Clone', async () => {
  const res = await fetchUrl(`http://localhost:${PORT}/`);
  assert.strictEqual(res.status, 200);
  assert.ok(res.text.includes('ModelTier') || res.text.includes('Model'), 'Must serve valid HTML');
});
