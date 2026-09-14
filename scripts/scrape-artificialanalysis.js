/**
 * scrape-artificialanalysis.js
 * Comprehensive live scraper for artificialanalysis.ai
 * Pulls all 300+ models, benchmarks, highlights, changelog, and articles.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error(`Timeout fetching ${url}`));
    });
  });
}

function cleanHtmlText(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function parseNumber(str) {
  if (!str || str === '--') return null;
  const num = parseFloat(str.replace(/[^0-9.-]/g, ''));
  return isNaN(num) ? null : num;
}

// Estimate Vietnamese Fluency (0-100) based on lab and language support patterns
function calculateVietnameseRating(name, creator, intelligence) {
  const n = name.toLowerCase();
  const c = creator.toLowerCase();
  let rating = 80;

  if (c.includes('openai')) rating = 96;
  else if (c.includes('google')) rating = 95;
  else if (c.includes('anthropic')) rating = 94;
  else if (c.includes('deepseek')) rating = 89;
  else if (c.includes('meta')) rating = 87;
  else if (c.includes('alibaba') || c.includes('qwen')) rating = 86;
  else if (c.includes('mistral')) rating = 83;
  else if (c.includes('xai')) rating = 85;

  if (intelligence && intelligence > 45) rating += 3;
  if (intelligence && intelligence < 20) rating -= 8;

  return Math.max(50, Math.min(99, rating));
}

// Determine Tier (S, A, B, C)
function determineTier(intelligence, costPerTask, speed) {
  const intel = intelligence || 0;
  if (intel >= 45) return 'S';
  if (intel >= 35) return 'A';
  if (intel >= 20) return 'B';
  return 'C';
}

async function scrapeAll() {
  console.log('🌐 [Live Scraper] Connecting to artificialanalysis.ai...');
  const startTime = Date.now();

  try {
    // 1. Fetch homepage for Highlights and Articles
    console.log('📡 Fetching homepage (Highlights, Charts & Articles)...');
    const homeHtml = await fetchUrl('https://artificialanalysis.ai/');

    // 2. Fetch Leaderboard table for all 300+ models
    console.log('📡 Fetching full Leaderboard table (All Models)...');
    const leaderboardHtml = await fetchUrl('https://artificialanalysis.ai/leaderboards/models');

    // --- Parse Highlights Datasets from Homepage JSON-LD ---
    const jsonLdRegex = /<script type="application\/ld\+json">(.*?)<\/script>/gs;
    let match;
    const datasets = {};

    while ((match = jsonLdRegex.exec(homeHtml)) !== null) {
      try {
        const parsed = JSON.parse(match[1]);
        if (parsed.name && parsed.data) {
          datasets[parsed.name] = parsed.data;
        }
      } catch (e) {
        // ignore malformed script
      }
    }

    console.log(`✅ Extracted ${Object.keys(datasets).length} JSON-LD datasets from homepage.`);

    // --- Parse Articles ---
    const articles = [];
    const articleRegex = /href=["']\/articles\/([a-zA-Z0-9_\-]+)["'][^>]*>.*?<p class="text-base[^"]*">([^<]+)<\/p>.*?<p class="text-sm[^"]*">([^<]+)<\/p>/gs;
    while ((match = articleRegex.exec(homeHtml)) !== null) {
      articles.push({
        slug: match[1],
        title: cleanHtmlText(match[2]),
        summary: cleanHtmlText(match[3]),
        url: `https://artificialanalysis.ai/articles/${match[1]}`
      });
    }

    // --- Parse Changelog items ---
    const changelog = [];
    const changelogRegex = /<div class="col-span-1 row-span-1 text-xs text-neutral-500 leading-none">([^<]+)<\/div>.*?href=["']\/models\/([a-zA-Z0-9_\-]+)["'][^>]*>.*?<span class="line-clamp-2[^"]*">([^<]+)<\/span>/gs;
    while ((match = changelogRegex.exec(homeHtml)) !== null) {
      changelog.push({
        date: cleanHtmlText(match[1]),
        slug: match[2],
        modelName: cleanHtmlText(match[3]),
      });
    }

    // --- Parse Full Models Table ---
    const models = [];
    const trRegex = /<tr[^>]*>(.*?)<\/tr>/gs;
    let trMatch;
    let rowIndex = 0;

    while ((trMatch = trRegex.exec(leaderboardHtml)) !== null) {
      rowIndex++;
      const rowContent = trMatch[1];
      if (rowIndex === 1) continue; // Skip table header row

      const tdMatches = rowContent.match(/<td.*?>(.*?)<\/td>/gs);
      if (!tdMatches || tdMatches.length < 8) continue;

      const cells = tdMatches.map(cleanHtmlText);

      const name = cells[0];
      const contextWindow = cells[1];
      const creator = cells[2];
      const intelligenceStr = cells[3];
      const costStr = cells[4];
      const speedStr = cells[5];
      const latencyStr = cells[6];
      const totalTimeStr = cells[7];

      // Extract model slug from row href
      const slugMatch = rowContent.match(/href=["']\/models\/([a-zA-Z0-9_\-]+)["']/);
      const slug = slugMatch ? slugMatch[1] : name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

      const intelligenceScore = parseNumber(intelligenceStr);
      const costPerTaskUSD = parseNumber(costStr);
      const outputSpeed = parseNumber(speedStr);
      const latencyFirstChunk = parseNumber(latencyStr);
      const totalResponseTime = parseNumber(totalTimeStr);

      const vietnameseRating = calculateVietnameseRating(name, creator, intelligenceScore);
      const tier = determineTier(intelligenceScore, costPerTaskUSD, outputSpeed);

      const isOpenWeights = name.toLowerCase().includes('oss') || 
                            name.toLowerCase().includes('deepseek') || 
                            name.toLowerCase().includes('llama') || 
                            name.toLowerCase().includes('qwen') || 
                            name.toLowerCase().includes('mistral') ||
                            name.toLowerCase().includes('glm') ||
                            name.toLowerCase().includes('gemma') ||
                            name.toLowerCase().includes('k2');

      const hasVision = name.toLowerCase().includes('omni') || 
                        name.toLowerCase().includes('4o') || 
                        name.toLowerCase().includes('gemini') || 
                        name.toLowerCase().includes('claude') || 
                        name.toLowerCase().includes('vl');

      models.push({
        id: slug,
        slug,
        name,
        creator: creator || 'AI Lab',
        contextWindow: contextWindow || '128k',
        tier,
        isOpenWeights,
        hasVision,
        intelligenceScore: intelligenceScore !== null ? intelligenceScore : 25,
        intelligenceScoreRaw: intelligenceStr,
        costPerTaskUSD: costPerTaskUSD !== null ? costPerTaskUSD : 0.5,
        costPerTaskRaw: costStr,
        outputSpeed: outputSpeed !== null ? outputSpeed : 60,
        outputSpeedRaw: speedStr,
        latencyFirstChunk: latencyFirstChunk !== null ? latencyFirstChunk : 1.0,
        latencyRaw: latencyStr,
        totalResponseTime: totalResponseTime !== null ? totalResponseTime : 5.0,
        totalTimeRaw: totalTimeStr,
        vietnameseRating,
        url: `https://artificialanalysis.ai/models/${slug}`,
        providersUrl: `https://artificialanalysis.ai/models/${slug}/providers`
      });
    }

    console.log(`✅ Successfully extracted ${models.length} live models from table!`);

    const durationMs = Date.now() - startTime;

    const payload = {
      source: 'https://artificialanalysis.ai',
      syncedAt: new Date().toISOString(),
      durationMs,
      totalModels: models.length,
      highlights: {
        intelligence: datasets['Intelligence'] || [],
        speed: datasets['Speed'] || [],
        costPerTask: datasets['Cost per Task'] || [],
        intelligenceIndexTop20: datasets['Artificial Analysis Intelligence Index'] || [],
        openness: datasets['Artificial Analysis Openness Index: Components'] || [],
        pricing: datasets['Pricing: Cache Hit, Input, and Output'] || [],
      },
      articles,
      changelog,
      models,
    };

    // Save to data directory - write to both process.cwd() and __dirname fallback
    const targetDirs = Array.from(new Set([
      path.resolve(process.cwd(), 'src', 'data'),
      path.resolve(__dirname, '..', 'src', 'data'),
    ]));

    for (const outputDir of targetDirs) {
      try {
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }
        const outputFile = path.join(outputDir, 'live_data.json');
        fs.writeFileSync(outputFile, JSON.stringify(payload, null, 2), 'utf8');

        const statusFile = path.join(outputDir, 'sync_status.json');
        fs.writeFileSync(statusFile, JSON.stringify({
          status: 'success',
          syncedAt: payload.syncedAt,
          durationMs,
          totalModels: models.length,
          nextSyncScheduled: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
        }, null, 2), 'utf8');
        console.log(`💾 Live data saved to ${outputFile}`);
      } catch (err) {
        console.warn(`Could not write to ${outputDir}:`, err.message);
      }
    }

    console.log(`🎉 Sync completed in ${durationMs}ms with ${models.length} models!`);
    return payload;
  } catch (err) {
    console.error('❌ Scraper error:', err);
    throw err;
  }
}

if (require.main === module) {
  scrapeAll().then(() => process.exit(0)).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { scrapeAll };
