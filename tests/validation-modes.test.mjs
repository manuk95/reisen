import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

const repositoryRoot = path.resolve(import.meta.dirname, '..');
const sourceValidator = path.join(repositoryRoot, 'scripts/validate-source.mjs');
const buildValidator = path.join(repositoryRoot, 'scripts/validate-build.mjs');

test('source validation does not require dist', () => {
  const result = spawnSync(process.execPath, [sourceValidator], { cwd: repositoryRoot, encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Quellen geprüft/);
});

test('build validation fails clearly when dist is missing', () => {
  const directory = mkdtempSync(path.join(tmpdir(), 'reisen-validation-'));
  try {
    const result = spawnSync(process.execPath, [buildValidator], { cwd: directory, encoding: 'utf8' });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /dist\/ fehlt.*npm run build/);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test('build validation detects a missing internal link independently of sources', () => {
  const directory = mkdtempSync(path.join(tmpdir(), 'reisen-validation-'));
  try {
    mkdirSync(path.join(directory, 'dist'));
    writeFileSync(path.join(directory, 'dist/index.html'), '<a href="/reisen/nicht-vorhanden/">Fehlt</a>');
    const result = spawnSync(process.execPath, [buildValidator], { cwd: directory, encoding: 'utf8' });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /interner Link fehlt \/reisen\/nicht-vorhanden\//);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
