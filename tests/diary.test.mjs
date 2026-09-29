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
    assert.match(content, /^locations:/m);
    assert.match(content, /^images:/m);
    assert.match(content, /^## Das haben wir erlebt$/m);
  });
});

test('diary images are local publishable assets with alternative text', () => {
  for (const file of diaryFiles) {
    const content = fs.readFileSync(`src/content/tagebuch/${file}`, 'utf8');
    const imagePaths = [...content.matchAll(/^\s+- src: ["']?([^"'\n]+)["']?$/gm)].map((match) => match[1]);
    const alternativeTexts = [...content.matchAll(/^\s+alt: ["']?([^"'\n]+)["']?$/gm)].map((match) => match[1]);

    assert.equal(alternativeTexts.length, imagePaths.length, `${file}: every image needs alternative text`);
    imagePaths.forEach((imagePath) => {
      assert.doesNotMatch(imagePath, /^https?:/, `${file}: diary images must not be hotlinked`);
      assert.ok(fs.existsSync(`public/${imagePath}`), `${file}: missing public/${imagePath}`);
    });
  }
});

test('the first diary entry has complete map and gallery data', () => {
  const content = fs.readFileSync('src/content/tagebuch/tag-01.md', 'utf8');
  assert.equal([...content.matchAll(/^\s+- src:/gm)].length, 10);
  assert.equal([...content.matchAll(/^\s+- label:/gm)].length, 3);
  assert.equal([...content.matchAll(/^\s+coordinates: \{ lat: -?\d+(?:\.\d+)?, lon: -?\d+(?:\.\d+)? \}$/gm)].length, 3);
  assert.equal([...content.matchAll(/^\s+googleMapsUrl: "https:\/\/www\.google\.com\/maps\/search\/\?api=1&query=-?\d+(?:\.\d+)?,-?\d+(?:\.\d+)?"$/gm)].length, 3);
});

test('diary pages expose navigation, maps and location links', () => {
  const page = fs.readFileSync('src/pages/[trip]/tagebuch/[slug].astro', 'utf8');
  assert.match(page, /class="day-navigation"/);
  assert.match(page, /Google Maps/);
  assert.match(page, /itemUrl/);
  assert.match(page, /L\.map\('diary-map'/);
});
