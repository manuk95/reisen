import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const navigation = readFileSync('src/data/site-pages.ts', 'utf8');
const language = readFileSync('src/content/wissen/sprache.md', 'utf8');
const page = readFileSync('src/pages/georgien/wissen/[slug].astro', 'utf8');

const sections = [
  ['Hintergrundwissen', 'hintergrundwissen'],
  ['Grundwortschatz', 'grundwortschatz'],
  ['Sätze', 'sätze'],
  ['Ortsnamen', 'ortsnamen'],
];

test('Wissen-Menü enthält die drei erwarteten bestehenden Routen', () => {
  const group = navigation.split("{ label: 'Wissen über Georgien', items: [")[1]?.split('] },')[0];
  assert.ok(group, 'Wissen muss als ausklappbare Navigationsgruppe definiert sein');
  assert.deepEqual(
    [...group.matchAll(/\{ label: '([^']+)', path: '([^']+)' \}/g)].map((match) => [match[1], match[2]]),
    [
      ['Allgemeines', 'georgien/wissen/'],
      ['Packliste', 'georgien/wissen/packliste/'],
      ['Sprache', 'georgien/wissen/sprache/'],
    ],
  );
});

test('Sprachführer hat vier auswählbare und entsprechend gegliederte Bereiche', () => {
  assert.deepEqual([...language.matchAll(/^## (.+)$/gm)].map((match) => match[1]), sections.map(([name]) => name));
  for (const [name, id] of sections) {
    assert.ok(page.includes(`label: '${name}', id: '${id}'`), `Auswahlschalter für ${name} fehlt`);
  }
  assert.match(page, /data-language-switcher/);
  assert.match(page, /window\.addEventListener\('popstate', sync\)/);
  assert.match(page, /panel\.hidden = id !== key/);
});

test('Beispielsätze und die tatsächlichen Reiseorte sind im Sprachführer enthalten', () => {
  assert.match(language, /Das Essen war sehr lecker\./);
  assert.match(language, /Danke, das ist sehr nett von Ihnen\./);
  for (const name of ['Tbilisi', 'Mtskheta', 'Stepantsminda', 'Uplisziche', 'Gori', 'Kutaisi', 'Shekvetili', 'Batumi']) {
    assert.ok(language.includes(name), `${name} fehlt`);
  }
});
