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
