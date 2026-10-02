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

  assert.match(build, /^\s+cache: npm$/m);
  assert.deepEqual(commands, [
    '|',
    'node scripts/run-ci-step.mjs "Medienvorbereitung" npm run media',
    'node scripts/run-ci-step.mjs "Installation" npm ci',
    'node scripts/run-ci-step.mjs "Build/Pagefind" npm run build',
    'node scripts/run-ci-step.mjs "Build-Validierung" npm run test:built',
  ]);
  assert.doesNotMatch(build, /npm run (?:check|test)(?:\s|$)/);
  assert.match(build, /uses: actions\/upload-pages-artifact@v5/);
  assert.equal(packageJson.scripts['test:built'], 'node scripts/validate.mjs');
});

test('Pages quality job runs checks and tests without building or uploading', () => {
  const quality = getIndentedBlock(workflow, 'quality', 2);

  assert.match(quality, /^\s+cache: npm$/m);
  assert.deepEqual(getRunCommands(quality), [
    'node scripts/run-ci-step.mjs "Medienvorbereitung" npm run media',
    'node scripts/run-ci-step.mjs "Installation" npm ci',
    'node scripts/run-ci-step.mjs "Astro-Check" npm run check',
    'node scripts/run-ci-step.mjs "Tests" npm run test',
  ]);
  assert.doesNotMatch(quality, /npm run (?:build|test:built)|upload-pages-artifact/);
});

test('Pages deployment waits for quality and build', () => {
  const deploy = getIndentedBlock(workflow, 'deploy', 2);
  assert.match(deploy, /^\s+needs: \[quality, build\]$/m);
  assert.doesNotMatch(deploy, /npm (?:ci|run)|upload-pages-artifact/);
});

test('Pages steps are named and command phases publish diagnostics', () => {
  const stepBlocks = workflow.split(/^\s{6}- /m).slice(1);
  for (const step of stepBlocks) assert.match(step, /^name: .+/m);
  for (const phase of ['Installation', 'Medienvorbereitung', 'Astro-Check', 'Tests', 'Build/Pagefind', 'Build-Validierung']) {
    assert.match(workflow, new RegExp(`run-ci-step\\.mjs "${phase}"`, 'g'));
  }
  assert.match(workflow, /GITHUB_STEP_SUMMARY/);
  assert.match(workflow, /Build-Grösse \| HTML-Dateien/);
});
