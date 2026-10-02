import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
const workflow = readFileSync('.github/workflows/pages.yml', 'utf8');

test('routine tests and builds never download licensed media', () => {
  assert.doesNotMatch(packageJson.scripts.pretest ?? '', /fetch-licensed-images/);
  assert.doesNotMatch(packageJson.scripts.prebuild ?? '', /fetch-licensed-images/);
  assert.match(packageJson.scripts.media, /fetch-licensed-images/);
  assert.match(packageJson.scripts.prebuild, /generate-pwa/);
});

test('Pages build caches npm and validates generated links', () => {
  assert.match(workflow, /cache: npm/);
  assert.match(workflow, /npm run build[\s\S]*npm run test:built/);
  assert.equal(packageJson.scripts['test:built'], 'node scripts/validate.mjs');
});

test('Pages steps are named and command phases publish diagnostics', () => {
  const stepBlocks = workflow.split(/^\s{6}- /m).slice(1);
  for (const step of stepBlocks) assert.match(step, /^name: .+/m);
  for (const phase of ['Installation', 'Medienvorbereitung', 'Astro-Check', 'Tests', 'Build/Pagefind', 'Build-Validierung']) {
    assert.match(workflow, new RegExp(`run-ci-step\\.mjs "${phase}"`));
  }
  assert.match(workflow, /GITHUB_STEP_SUMMARY/);
  assert.match(workflow, /Build-Grösse \| HTML-Dateien/);
});
