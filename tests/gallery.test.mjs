import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('gallery is manual, accessible and swipe-capable', () => {
  const source=readFileSync(new URL('../src/components/ItemGallery.astro',import.meta.url),'utf8');
  assert.match(source,/data-previous aria-label="Vorheriges Bild"/);
  assert.match(source,/data-next aria-label="Nächstes Bild"/);
  assert.match(source,/ArrowLeft/);
  assert.match(source,/ArrowRight/);
  assert.match(source,/touchstart/);
  assert.doesNotMatch(source,/setInterval|autoplay/i);
});

test('single image has no controls and lists use the primary image', () => {
  const gallery=readFileSync(new URL('../src/components/ItemGallery.astro',import.meta.url),'utf8');
  const list=readFileSync(new URL('../src/components/CollectionList.astro',import.meta.url),'utf8');
  assert.match(gallery,/slides\.length>1/);
  assert.match(list,/images\?\.\[0\]/);
});

test('knowledge pages render images-array galleries without legacy image', () => {
  const page=readFileSync(new URL('../src/pages/georgien/wissen/[slug].astro',import.meta.url),'utf8');
  assert.match(page,/entry\.data\.images\.length>0\|\|entry\.data\.image/);
  assert.match(page,/legacy=\{entry\.data\.image\?/);
});
