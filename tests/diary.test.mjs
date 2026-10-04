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

test('filled diary entries link mentioned destinations to canonical pages', () => {
  const expectedLinks = {
    'tag-01.md': ['orte/tbilisi', 'hotels/silver-39-corner', 'genuss/badrijani-nigvzit', 'genuss/pchali', 'genuss/chinkali'],
    'tag-02.md': ['orte/tbilisi', 'sehenswuerdigkeiten/mtatsminda', 'sehenswuerdigkeiten/dry-bridge-fabrika', 'sehenswuerdigkeiten/sameba-kathedrale', 'sehenswuerdigkeiten/friedensbruecke-rike-park', 'hotels/silver-39-corner'],
    'tag-03.md': ['orte/tbilisi', 'sehenswuerdigkeiten/friedensbruecke-rike-park', 'sehenswuerdigkeiten/altstadt-metekhi', 'sehenswuerdigkeiten/narikala', 'sehenswuerdigkeiten/schwefelbaeder', 'genuss/adscharisches-chatschapuri', 'restaurants/barbarestan', 'hotels/silver-39-corner', 'genuss/tkemali'],
    'tag-04.md': ['hotels/silver-39-corner', 'orte/tbilisi', 'sehenswuerdigkeiten/chronicles-of-georgia', 'sehenswuerdigkeiten/dschwari-kloster', 'orte/mtskheta', 'sehenswuerdigkeiten/ananuri-schinwali', 'sehenswuerdigkeiten/gudauri-kreuzpass', 'hotels/baza-kazbegi', 'genuss/jonjoli'],
    'tag-05.md': ['sehenswuerdigkeiten/gergeti', 'orte/stepantsminda', 'sehenswuerdigkeiten/heerstrasse', 'sehenswuerdigkeiten/dariali-gveleti', 'sehenswuerdigkeiten/sno-festung', 'sehenswuerdigkeiten/pansheti-mineralpool'],
  };

  for (const [file, routes] of Object.entries(expectedLinks)) {
    const content = fs.readFileSync(`src/content/tagebuch/${file}`, 'utf8');
    routes.forEach((route) => assert.match(content, new RegExp(`\\]\\(/reisen/georgien/${route}/\\)`), `${file}: missing ${route}`));
  }
});

test('new diary links include the deployment base and resolve to existing content routes', () => {
  const sectionCollections = { orte: 'orte', sehenswuerdigkeiten: 'sehenswuerdigkeiten', hotels: 'unterkuenfte', restaurants: 'restaurants', genuss: 'genuss' };

  for (const file of diaryFiles.slice(0, 5)) {
    const content = fs.readFileSync(`src/content/tagebuch/${file}`, 'utf8');
    const internalLinks = [...content.matchAll(/\]\((\/[^)]+)\)/g)].map((match) => match[1]);
    assert.ok(internalLinks.length > 0, `${file}: expected canonical links`);

    for (const link of internalLinks) {
      assert.match(link, /^\/reisen\/georgien\/(orte|sehenswuerdigkeiten|hotels|restaurants|genuss)\/[a-z0-9-]+\/$/, `${file}: invalid canonical route ${link}`);
      const [, section, slug] = link.match(/^\/reisen\/georgien\/([^/]+)\/([^/]+)\/$/);
      assert.ok(fs.existsSync(`src/content/${sectionCollections[section]}/${slug}.md`), `${file}: missing target for ${link}`);
    }
  }
});

test('diary location references cover matching day 5 guide pages without replacing map links', () => {
  const content = fs.readFileSync('src/content/tagebuch/tag-05.md', 'utf8');
  assert.match(content, /page: "sehenswuerdigkeiten:gergeti"/);
  assert.match(content, /page: "sehenswuerdigkeiten:dariali-gveleti"/);
  assert.match(content, /page: "sehenswuerdigkeiten:sno-festung"/);
  assert.match(content, /page: "sehenswuerdigkeiten:pansheti-mineralpool"/);
  assert.equal([...content.matchAll(/^\s+googleMapsUrl:/gm)].length, 6);
});
