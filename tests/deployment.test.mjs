import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
const workflow = readFileSync('.github/workflows/pages.yml', 'utf8');

function getIndentedBlock(source, heading, indent) {
  const lines = source.split('\n');
  const start = lines.findIndex((line) => line === `${' '.repeat(indent)}${heading}:`);
  assert.notEqual(start, -1, `Missing ${heading} block`);

  const end = lines.findIndex(
    (line, index) => index > start && line.trim() && !line.startsWith(' '.repeat(indent + 1)),
  );
  return lines.slice(start, end === -1 ? undefined : end).join('\n');
}

function getRunCommands(job) {
  return [...job.matchAll(/^\s+run:\s*(.+)$/gm)].map((match) => match[1]);
}

test('routine tests and builds never download licensed media', () => {
  assert.doesNotMatch(packageJson.scripts.pretest ?? '', /fetch-licensed-images/);
  assert.doesNotMatch(packageJson.scripts.prebuild ?? '', /fetch-licensed-images/);
  assert.match(packageJson.scripts.media, /fetch-licensed-images/);
  assert.match(packageJson.scripts.prebuild, /generate-pwa/);
});

test('Pages build caches npm and validates generated links', () => {
  const build = getIndentedBlock(workflow, 'build', 2);
  const commands = getRunCommands(build);

  assert.match(build, /uses: actions\/cache@v4/);
  assert.ok(commands.includes('node scripts/run-ci-step.mjs "Medienvorbereitung" npm run media'));
  assert.ok(commands.includes('node scripts/run-ci-step.mjs "Installation (npm ci)" npm ci'));
  assert.ok(commands.includes('node scripts/run-ci-step.mjs "Build" npm run build:ci'));
  assert.ok(commands.includes('node scripts/run-ci-step.mjs "Pagefind" npm run index:search'));
  assert.ok(commands.includes('node scripts/run-ci-step.mjs "Build-Validierung" npm run validate:build'));
  assert.match(build, /uses: actions\/upload-pages-artifact@v5/);
  assert.equal(packageJson.scripts['validate:source'], 'node scripts/validate-source.mjs');
  assert.equal(packageJson.scripts['validate:build'], 'node scripts/validate-build.mjs');
  assert.match(packageJson.scripts.test, /^npm run validate:source && node --test/);
});

test('Pages build runs quality checks after one media preparation', () => {
  const build = getIndentedBlock(workflow, 'build', 2);
  assert.equal((build.match(/npm run media/g) ?? []).length, 1);
  assert.match(build, /npm run check/);
  assert.match(build, /npm run test/);
  assert.doesNotMatch(workflow, /^  quality:/m);
});

test('Pages deployment waits for the build', () => {
  const deploy = getIndentedBlock(workflow, 'deploy', 2);
  assert.match(deploy, /^\s+needs: build$/m);
  assert.doesNotMatch(deploy, /npm (?:ci|run)|upload-pages-artifact|actions\/checkout|actions\/setup-node/);
  assert.match(deploy, /^\s+timeout: 600000$/m);
  assert.match(workflow, /^\s+cancel-in-progress: false$/m);
});

test('Pages steps are named and command phases publish diagnostics', () => {
  const stepBlocks = workflow.split(/^\s{6}- /m).slice(1);
  for (const step of stepBlocks) assert.match(step, /^name: .+/m);
  for (const phase of ['Installation (npm ci)', 'Medienvorbereitung', 'Qualitätsprüfung (Astro/TypeScript)', 'Qualitätsprüfung (Tests)', 'Build', 'Pagefind', 'Build-Validierung']) {
    assert.ok(workflow.includes(`run-ci-step.mjs "${phase}"`), `Missing diagnostic phase: ${phase}`);
  }
  assert.match(workflow, /GITHUB_STEP_SUMMARY/);
  assert.match(workflow, /Build-Grösse \| HTML-Dateien/);
});
