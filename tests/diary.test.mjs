import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const diaryFiles = fs.readdirSync('src/content/tagebuch').filter((file) => file.endsWith('.md')).sort();

test('one editable diary scaffold exists for every trip day', () => {
  const dayFiles = fs.readdirSync('src/content/reisetage').filter((file) => file.endsWith('.md')).sort();
  assert.equal(diaryFiles.length, dayFiles.length);
  assert.deepEqual(diaryFiles, dayFiles);
  diaryFiles.forEach((file, index) => {
    const content = fs.readFileSync(`src/content/tagebuch/${file}`, 'utf8');
    assert.match(content, new RegExp(`^day: ${index + 1}$`, 'm'));
    assert.match(content, /^locations: \[\]$/m);
    assert.match(content, /^images: \[\]$/m);
    assert.match(content, /^## Das haben wir erlebt$/m);
  });
});

test('diary pages expose navigation, maps and location links', () => {
  const page = fs.readFileSync('src/pages/[trip]/tagebuch/[slug].astro', 'utf8');
  assert.match(page, /class="day-navigation"/);
  assert.match(page, /Google Maps/);
  assert.match(page, /itemUrl/);
  assert.match(page, /L\.map\('diary-map'/);
});
