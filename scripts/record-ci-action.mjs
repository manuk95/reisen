import { appendFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const [label, startedValue, outcome, directory] = process.argv.slice(2);
const started = Number(startedValue);

if (!label || !Number.isFinite(started) || !outcome) {
  console.error('Verwendung: node scripts/record-ci-action.mjs <Name> <Start-ms> <Ergebnis> [Verzeichnis]');
  process.exit(2);
}

let bytes = 0;
let html = 0;

async function walk(currentDirectory) {
  for (const entry of await readdir(currentDirectory, { withFileTypes: true })) {
    const file = path.join(currentDirectory, entry.name);
    if (entry.isDirectory()) await walk(file);
    else {
      bytes += (await stat(file)).size;
      if (entry.name.endsWith('.html')) html += 1;
    }
  }
}

if (directory) await walk(directory);

const duration = ((Date.now() - started) / 1000).toFixed(1);
const result = outcome === 'success' ? '✅ erfolgreich' : `❌ ${outcome}`;
const size = directory ? `${(bytes / 1024 / 1024).toFixed(2)} MiB` : '–';
const htmlCount = directory ? String(html) : '–';
const row = `| ${label.replaceAll('|', '\\|')} | ${result} | ${duration} s | ${size} | ${htmlCount} |\n`;

if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, row);
else console.log(`CI-Metrik: ${row.trim()}`);
