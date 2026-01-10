#!/usr/bin/env node

const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');

const ROOT_DIR = __dirname;
const EVENTS_PATH = path.join(ROOT_DIR, 'events.json');
const OUTPUT_ROOT = path.join(ROOT_DIR, 'papers');
const SLEEP_MS = 1000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));

const getPeriodStart = (period) => {
  if (!period || !period.from) {
    return null;
  }
  const [yearStr, monthStr] = String(period.from).split('-');
  const year = Number(yearStr);
  const month = Number(monthStr);
  if (!Number.isFinite(year) || !Number.isFinite(month)) {
    return null;
  }
  return { year, month };
};

const getEventYear = (period) => {
  const periodStart = getPeriodStart(period);
  return periodStart ? periodStart.year : null;
};

const getFiscalYear = ({ year, month }) => (month <= 3 ? year - 1 : year);

const buildPaperUrl = (event) => {
  const eventId = event?.jpdga?.eventId;
  if (!eventId) {
    return { url: null, reason: 'missing jpdga.eventId' };
  }

  const periodStart = getPeriodStart(event?.period);
  if (!periodStart) {
    return { url: null, reason: 'invalid period' };
  }

  const { year, month } = periodStart;
  if (year < 2018 || (year === 2018 && month < 4)) {
    return { url: null, reason: 'before 2018-04' };
  }

  if (year >= 2025) {
    return { url: `https://membership.jpdga.jp/event/${year}/${eventId}.pdf` };
  }

  const fiscalYear = getFiscalYear(periodStart);
  return { url: `http://www.jpdga.jp/data/event/${fiscalYear}/${eventId}.pdf` };
};

const downloadFile = async (url, destPath) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  await fsp.writeFile(destPath, buffer);
  return buffer.length;
};

const main = async () => {
  if (!fs.existsSync(EVENTS_PATH)) {
    console.error(`events.json not found: ${EVENTS_PATH}`);
    process.exit(1);
  }

  const events = readJson(EVENTS_PATH);
  const tasks = [];

  for (const event of events) {
    const eventYear = getEventYear(event.period);
    if (!eventYear) {
      console.log(`skip: ${event.id} has no valid period`);
      continue;
    }

    const { url, reason } = buildPaperUrl(event);
    if (!url) {
      console.log(`skip: ${event.id} (${reason})`);
      continue;
    }

    const destDir = path.join(OUTPUT_ROOT, String(eventYear));
    const destPath = path.join(destDir, `${event.id}.pdf`);
    tasks.push({
      eventId: event.id,
      url,
      destDir,
      destPath,
    });
  }

  console.log(`downloads queued: ${tasks.length}`);

  for (let i = 0; i < tasks.length; i += 1) {
    const task = tasks[i];
    console.log(`[${i + 1}/${tasks.length}] ${task.eventId}`);
    console.log(`  url: ${task.url}`);
    console.log(`  dest: ${task.destPath}`);

    try {
      await fsp.mkdir(task.destDir, { recursive: true });
      if (fs.existsSync(task.destPath)) {
        console.log('  skip: already exists');
        continue;
      }
      const size = await downloadFile(task.url, task.destPath);
      console.log(`  saved: ${size} bytes`);
    } catch (error) {
      console.log(`  failed: ${error.message}`);
    }

    await sleep(SLEEP_MS);
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
