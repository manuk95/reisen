import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

test('mobile navigation offers the diary instead of search', () => {
  const source = readFileSync('src/data/site-pages.ts', 'utf8');
  const mobileNavigation = source.match(/export const mobileNavigation[\s\S]*?\n\];/)?.[0];
  assert.ok(mobileNavigation, 'mobileNavigation block is missing');
  assert.match(mobileNavigation, /\{ label: 'Tagebuch', path: 'georgien\/tagebuch\/' \}/);
  assert.doesNotMatch(mobileNavigation, /label: 'Suche'|path: 'suche\/'/);
});

test('culinary overview no longer shows the temporary review notice', () => {
  const source = readFileSync('src/pages/georgien/genuss.astro', 'utf8');
  assert.doesNotMatch(source, /Neu kontrolliert:/);
  assert.doesNotMatch(source, /<div class="alert">/);
  assert.match(source, /<h1>Kulinarik<\/h1>/);
  assert.match(source, /<List \{items\} section="genuss" showStatus=\{false\} \/>/);
});
