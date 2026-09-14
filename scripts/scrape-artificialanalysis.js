/**
 * scripts/scrape-artificialanalysis.js
 * Scrapes and extracts ALL available models, benchmarks, and highlights directly from artificialanalysis.ai.
 * Merges canonical model catalog (650+ models) with granular leaderboard measurements.
 * Can be run standalone or invoked via API route /api/sync.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
        },
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return resolve(fetchUrl(res.headers.location));
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode} fetching ${url}`));
        }
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve(data));
      }
    );
    req.on('error', reject);
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error(`Timeout fetching ${url}`));
    });
  });
}

function cleanHtmlText(str) {
  if (!str) return '';
  return str
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseNumber(val) {
  if (!val || val === '--') return null;
  const cleaned = val.replace(/[\$,đ%s]/g, '').trim();
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}

function calculateVietnameseRating(name, creator, intelligence) {
  const n = (name || '').toLowerCase();
  const c = (creator || '').toLowerCase();

  let rating = 80;
  if (n.includes('claude') || c.includes('anthropic')) rating = 96;
  else if (n.includes('gpt-4') || n.includes('gpt-5') || n.includes('o3') || n.includes('o1') || c.includes('openai')) rating = 95;
  else if (n.includes('gemini') || c.includes('google')) rating = 93;
  else if (n.includes('deepseek')) rating = 91;
  else if (c.includes('meta') || n.includes('llama')) rating = 88;
  else if (c.includes('alibaba') || n.includes('qwen')) rating = 89;
  else if (c.includes('mistral')) rating = 84;
  else if (c.includes('xai') || n.includes('grok')) rating = 86;

  if (intelligence && intelligence > 45) rating += 2;
  if (intelligence && intelligence < 20) rating -= 6;

  return Math.max(50, Math.min(99, rating));
}

function determineTier(intelligence, costPerTask, speed) {
  const intel = intelligence || 0;
  if (intel >= 45) return 'S';
  if (intel >= 34) return 'A';
  if (intel >= 20) return 'B';
  return 'C';
}

async function scrapeAll() {
  console.log('🌐 [Live Scraper] Connecting to artificialanalysis.ai...');
  const startTime = Date.now();

  try {
    // 1. Fetch homepage for Highlights, Charts & Articles
    console.log('📡 Fetching homepage (Highlights, Charts & Articles)...');
    const homeHtml = await fetchUrl('https://artificialanalysis.ai/');

    // 2. Fetch Leaderboard table with granular benchmark measurements
    console.log('📡 Fetching Leaderboard benchmark table...');
    const leaderboardHtml = await fetchUrl('https://artificialanalysis.ai/leaderboards/models');

    // 3. Fetch canonical models catalog
    console.log('📡 Fetching full canonical Model Catalog from /models...');
    let catalogModels = [];
    try {
      const catalogHtml = await fetchUrl('https://artificialanalysis.ai/models');
      const scripts = catalogHtml.match(/<script[^>]*>(.*?)<\/script>/gs) || [];
      for (const s of scripts) {
        if (s.includes('models\\\":[{\\\"slug')) {
          const startIdx = s.indexOf('models\\\":[');
          const arrayStart = s.indexOf('[', startIdx);
          let depth = 0;
          let arrayEnd = -1;
          for (let j = arrayStart; j < s.length; j++) {
            if (s[j] === '[') depth++;
            else if (s[j] === ']') {
              depth--;
              if (depth === 0) {
                arrayEnd = j + 1;
                break;
              }
            }
          }
          if (arrayEnd > arrayStart) {
            const raw = s.slice(arrayStart, arrayEnd);
            const unescaped = raw.replace(/\\\\/g, '\\').replace(/\\"/g, '"');
            catalogModels = JSON.parse(unescaped);
            break;
          }
        }
      }
      console.log(`✅ Extracted ${catalogModels.length} models from canonical catalog!`);
    } catch (e) {
      console.warn('⚠️ Could not extract catalog models:', e.message);
    }

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
        url: `https://artificialanalysis.ai/articles/${match[1]}`,
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

    // --- Parse Full Models Table from Leaderboard ---
    const tableDataMap = new Map();
    const trMatches = leaderboardHtml.match(/<tr[^>]*>(.*?)<\/tr>/gs) || [];
    let rowIndex = 0;

    for (const rowContent of trMatches) {
      rowIndex++;
      if (rowIndex === 1) continue; // Skip header

      const tdMatches = rowContent.match(/<td.*?>(.*?)<\/td>/gs);
      if (!tdMatches || tdMatches.length < 8) continue;

      const cells = tdMatches.map(cleanHtmlText);
      const slugMatch = rowContent.match(/href=["']\/models\/([a-zA-Z0-9_\-]+)["']/);
      const slug = slugMatch ? slugMatch[1] : cells[0].toLowerCase().replace(/[^a-z0-9]+/g, '-');

      tableDataMap.set(slug, {
        name: cells[0],
        contextWindow: cells[1],
        creator: cells[2],
        intelligenceStr: cells[3],
        costStr: cells[4],
        speedStr: cells[5],
        latencyStr: cells[6],
        totalTimeStr: cells[7],
      });
    }

    console.log(`✅ Extracted ${tableDataMap.size} measured models from leaderboard table.`);

    // --- Merge All Models dynamically ---
    const models = [];
    const processedSlugs = new Set();

    // 1. Process all models from canonical catalog (650+ models)
    for (const cat of catalogModels) {
      const slug = cat.slug;
      processedSlugs.add(slug);
      const tData = tableDataMap.get(slug);

      const name = tData ? tData.name : cat.name;
      const creator = (cat.creator && cat.creator.name) || (tData ? tData.creator : 'AI Lab');
      const contextWindow = tData ? tData.contextWindow : '128k';

      const intelligenceScore = tData ? parseNumber(tData.intelligenceStr) : (cat.isReasoning ? 39 : 25);
      const intelligenceScoreRaw = tData ? tData.intelligenceStr : (cat.isReasoning ? '39' : '--');

      const costPerTaskUSD = tData ? parseNumber(tData.costStr) : 0.5;
      const costPerTaskRaw = tData ? tData.costStr : '--';

      const outputSpeed = tData ? parseNumber(tData.speedStr) : 60;
      const outputSpeedRaw = tData ? tData.speedStr : '--';

      const latencyFirstChunk = tData ? parseNumber(tData.latencyStr) : 1.0;
      const latencyRaw = tData ? tData.latencyStr : '--';

      const totalResponseTime = tData ? parseNumber(tData.totalTimeStr) : 5.0;
      const totalTimeRaw = tData ? tData.totalTimeStr : '--';

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
        creatorLogo: cat.creator?.logo || null,
        contextWindow: contextWindow || '128k',
        tier,
        isOpenWeights,
        hasVision,
        isReasoning: !!cat.isReasoning,
        effort: cat.effort?.slug || null,
        deprecated: !!cat.deprecated,
        releaseDate: cat.releaseDate || null,
        intelligenceScore: intelligenceScore !== null ? intelligenceScore : 25,
        intelligenceScoreRaw,
        costPerTaskUSD: costPerTaskUSD !== null ? costPerTaskUSD : 0.5,
        costPerTaskRaw,
        outputSpeed: outputSpeed !== null ? outputSpeed : 60,
        outputSpeedRaw,
        latencyFirstChunk: latencyFirstChunk !== null ? latencyFirstChunk : 1.0,
        latencyRaw,
        totalResponseTime: totalResponseTime !== null ? totalResponseTime : 5.0,
        totalTimeRaw,
        vietnameseRating,
        url: `https://artificialanalysis.ai/models/${slug}`,
        providersUrl: `https://artificialanalysis.ai/models/${slug}/providers`,
      });
    }

    // 2. Include any models from the table that were not in catalog
    for (const [slug, tData] of tableDataMap.entries()) {
      if (!processedSlugs.has(slug)) {
        processedSlugs.add(slug);

        const intelligenceScore = parseNumber(tData.intelligenceStr);
        const costPerTaskUSD = parseNumber(tData.costStr);
        const outputSpeed = parseNumber(tData.speedStr);
        const latencyFirstChunk = parseNumber(tData.latencyStr);
        const totalResponseTime = parseNumber(tData.totalTimeStr);

        const vietnameseRating = calculateVietnameseRating(tData.name, tData.creator, intelligenceScore);
        const tier = determineTier(intelligenceScore, costPerTaskUSD, outputSpeed);

        const isOpenWeights = tData.name.toLowerCase().includes('oss') ||
                              tData.name.toLowerCase().includes('deepseek') ||
                              tData.name.toLowerCase().includes('llama') ||
                              tData.name.toLowerCase().includes('qwen');

        models.push({
          id: slug,
          slug,
          name: tData.name,
          creator: tData.creator || 'AI Lab',
          creatorLogo: null,
          contextWindow: tData.contextWindow || '128k',
          tier,
          isOpenWeights,
          hasVision: false,
          isReasoning: false,
          effort: null,
          deprecated: false,
          releaseDate: null,
          intelligenceScore: intelligenceScore !== null ? intelligenceScore : 25,
          intelligenceScoreRaw: tData.intelligenceStr,
          costPerTaskUSD: costPerTaskUSD !== null ? costPerTaskUSD : 0.5,
          costPerTaskRaw: tData.costStr,
          outputSpeed: outputSpeed !== null ? outputSpeed : 60,
          outputSpeedRaw: tData.speedStr,
          latencyFirstChunk: latencyFirstChunk !== null ? latencyFirstChunk : 1.0,
          latencyRaw: tData.latencyStr,
          totalResponseTime: totalResponseTime !== null ? totalResponseTime : 5.0,
          totalTimeRaw: tData.totalTimeStr,
          vietnameseRating,
          url: `https://artificialanalysis.ai/models/${slug}`,
          providersUrl: `https://artificialanalysis.ai/models/${slug}/providers`,
        });
      }
    }

    console.log(`🌟 Successfully compiled complete dataset of ${models.length} live models!`);

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
