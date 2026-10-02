import { spawn } from 'node:child_process';
import { appendFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const [label, command, ...args] = process.argv.slice(2);

if (!label || !command) {
  console.error('Verwendung: node scripts/run-ci-step.mjs <Name> <Befehl> [...Argumente]');
  process.exit(2);
}

const started = Date.now();
const child = spawn(command, args, { stdio: 'inherit', shell: false });
const exitCode = await new Promise((resolve, reject) => {
  child.once('error', reject);
  child.once('exit', (code, signal) => resolve(code ?? (signal ? 1 : 0)));
});

async function buildMetrics() {
  let bytes = 0;
  let html = 0;

  async function walk(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) await walk(file);
      else {
        bytes += (await stat(file)).size;
        if (entry.name.endsWith('.html')) html += 1;
      }
    }
  }

  try {
    await walk('dist');
    return { size: `${(bytes / 1024 / 1024).toFixed(2)} MiB`, html: String(html) };
  } catch (error) {
    if (error?.code === 'ENOENT') return { size: '–', html: '–' };
    throw error;
  }
}

const duration = ((Date.now() - started) / 1000).toFixed(1);
const metrics = await buildMetrics();
const result = exitCode === 0 ? '✅ erfolgreich' : `❌ fehlgeschlagen (${exitCode})`;
const row = `| ${label.replaceAll('|', '\\|')} | ${result} | ${duration} s | ${metrics.size} | ${metrics.html} |\n`;

if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, row);
else console.log(`CI-Metrik: ${row.trim()}`);

process.exit(exitCode);
