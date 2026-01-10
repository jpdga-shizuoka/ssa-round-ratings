#!/usr/bin/env node

const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');

const ROOT_DIR = __dirname;
const EVENTS_PATH = path.join(ROOT_DIR, 'events.json');
const OUTPUT_ROOT = path.join(ROOT_DIR, 'layouts');
const EXCLUDED_HOST = 'jpdga-shizuoka.github.io';
const SLEEP_MS = 1000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));

const getEventYear = (period) => {
  if (!period || !period.from) {
    return null;
  }
  const year = Number(String(period.from).slice(0, 4));
  return Number.isFinite(year) ? year : null;
};

const getFiscalYear = (period) => {
  if (!period || !period.from) {
    return null;
  }
  const [yearStr, monthStr] = String(period.from).split('-');
  const year = Number(yearStr);
  const month = Number(monthStr);
  if (!Number.isFinite(year) || !Number.isFinite(month)) {
    return null;
  }
  return month <= 3 ? year - 1 : year;
};

const hasFilenameInUrl = (urlString) => {
  try {
    const url = new URL(urlString);
    const filename = path.posix.basename(url.pathname);
    if (!filename || filename === '/' || !filename.includes('.')) {
      return null;
    }
    return filename;
  } catch (error) {
    return null;
  }
};

const isExcludedUrl = (urlString) => {
  try {
    const url = new URL(urlString);
    return url.hostname.includes(EXCLUDED_HOST);
  } catch (error) {
    return false;
  }
};

const buildDefaultLayoutUrl = (event) => {
  const eventId = event?.jpdga?.eventId;
  const fiscalYear = getFiscalYear(event?.period);
  if (!eventId || !fiscalYear) {
    return null;
  }
  return `http://www.jpdga.jp/data/event/${fiscalYear}/${eventId}_map.pdf`;
};

const normalizeLayoutEntries = (event) => {
  if (event.layout) {
    if (typeof event.layout === 'string') {
      return [{ key: 'official', url: event.layout }];
    }
    return Object.entries(event.layout)
      .filter(([, value]) => typeof value === 'string')
      .map(([key, url]) => ({ key, url }));
  }
  const defaultUrl = buildDefaultLayoutUrl(event);
  if (defaultUrl) {
    return [{ key: 'default', url: defaultUrl }];
  }
  return [];
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
    const layoutEntries = normalizeLayoutEntries(event);
    if (!layoutEntries.length) {
      console.log(`skip: ${event.id} has no layout and no default URL`);
      continue;
    }

    const eventYear = getEventYear(event.period);
    if (!eventYear) {
      console.log(`skip: ${event.id} has no valid period`);
      continue;
    }

    const useKeySuffix = layoutEntries.length > 1;
    for (const entry of layoutEntries) {
      if (!entry.url) {
        continue;
      }
      if (isExcludedUrl(entry.url)) {
        console.log(`skip: ${event.id} (${entry.key}) excluded domain`);
        continue;
      }
      const filename = hasFilenameInUrl(entry.url);
      if (!filename) {
        console.log(`skip: ${event.id} (${entry.key}) url has no filename`);
        continue;
      }
      const ext = path.posix.extname(filename);
      if (!ext) {
        console.log(`skip: ${event.id} (${entry.key}) url has no extension`);
        continue;
      }
      const baseName = useKeySuffix ? `${event.id}-${entry.key}` : event.id;
      const destDir = path.join(OUTPUT_ROOT, String(eventYear));
      const destPath = path.join(destDir, `${baseName}${ext}`);
      tasks.push({
        eventId: event.id,
        key: entry.key,
        url: entry.url,
        destDir,
        destPath,
      });
    }
  }

  console.log(`downloads queued: ${tasks.length}`);

  for (let i = 0; i < tasks.length; i += 1) {
    const task = tasks[i];
    const label = task.key ? `${task.eventId} (${task.key})` : task.eventId;
    console.log(`[${i + 1}/${tasks.length}] ${label}`);
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
