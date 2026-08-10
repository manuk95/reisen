import assert from 'node:assert/strict';
import test from 'node:test';
import dayPlan from '../src/markdown/day-plan.mjs';

const text = (value) => ({ type: 'text', value });
const heading = (level, value) => ({ type: 'element', tagName: `h${level}`, properties: {}, children: [text(value)] });
const paragraph = (value) => ({ type: 'element', tagName: 'p', properties: {}, children: [text(value)] });
const transform = (children) => {
  const tree = { type: 'root', children };
  dayPlan()(tree);
  return tree.children;
};

test('macht nur Programmpunkte mit Detailinhalt aufklappbar', () => {
  const children = transform([heading(2, 'Tagesablauf'), heading(3, '08:00 · Frühstück'), heading(3, '09:00–11:30 · Museum'), paragraph('Mit Link und Hinweis.')]);
  const plan = children.at(-1);
  assert.equal(plan.tagName, 'section');
  assert.equal(plan.children[1].tagName, 'div');
  assert.equal(plan.children[1].properties.className.includes('day-plan-item-static'), true);
  assert.equal(plan.children[2].tagName, 'details');
  assert.equal(plan.children[2].children[0].tagName, 'summary');
  assert.equal(plan.children[2].children[1].children[0].tagName, 'p');
});

test('behandelt flexible Zeitangaben als normalen Überschriftentext', () => {
  const children = transform([heading(2, 'Tagesablauf'), heading(3, 'ca. 13:00 · Mittagessen'), heading(3, 'Flexibel · Spa und Strand'), heading(3, 'Abends ohne Trenner')]);
  const summaries = children.at(-1).children.slice(1).map((node) => node.children[0].children[0].value);
  assert.deepEqual(summaries, ['ca. 13:00 · Mittagessen', 'Flexibel · Spa und Strand', 'Abends ohne Trenner']);
});

test('ergänzt leere Standardabschnitte und verändert andere Abschnitte nicht', () => {
  const children = transform([heading(2, 'Einleitung'), heading(3, 'Bleibt eine normale Überschrift'), heading(2, 'Tagesablauf'), heading(3, '08:00 · Start')]);
  assert.equal(children[1].tagName, 'h3');
  assert.equal(children[2].tagName, 'h2');
  assert.equal(children[2].children[0].value, 'Falls ihr kürzen müsst');
  assert.equal(children[3].children[0].value, 'Schlechtwetter');
  assert.equal(children[4].tagName, 'section');
});
