/**
 * sync-daemon.js
 * Continuous background scheduler that pulls real data from artificialanalysis.ai
 * every 15 minutes (configurable between 10-30 minutes).
 */

const { scrapeAll } = require('./scrape-artificialanalysis');

const INTERVAL_MINUTES = parseInt(process.env.SYNC_INTERVAL_MINUTES || '15', 10);
const INTERVAL_MS = INTERVAL_MINUTES * 60 * 1000;

console.log(`⏱️ [Sync Daemon] Starting automated real-time tracking daemon...`);
console.log(`⏱️ Interval: Every ${INTERVAL_MINUTES} minutes (${INTERVAL_MS / 1000}s)`);

async function runCycle() {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`\n🔄 [${timestamp}] Running scheduled sync from artificialanalysis.ai...`);
  try {
    const result = await scrapeAll();
    console.log(`✨ [${timestamp}] Sync success! ${result.totalModels} models updated.`);
    console.log(`⏳ Next sync in ${INTERVAL_MINUTES} minutes.`);
  } catch (err) {
    console.error(`⚠️ [${timestamp}] Scheduled sync encountered error:`, err.message);
  }
}

// Run initial sync immediately
runCycle();

// Set interval for continuous execution
setInterval(runCycle, INTERVAL_MS);
