import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const sw=readFileSync('scripts/pwa/sw-template.js','utf8');
const client=readFileSync('public/pwa-update.js','utf8');

test('the new worker waits for explicit user confirmation',()=>{
  const installHandler=sw.split('\n').find(line=>line.includes("addEventListener('install'"));
  assert.doesNotMatch(installHandler,/skipWaiting/);
  assert.match(sw,/SKIP_WAITING/);
  assert.match(client,/waiting\.postMessage\(\{type:'SKIP_WAITING'\}\)/);
});

test('activation cleans only old Reisefuehrer caches and informs all tabs',()=>{
  assert.match(sw,/key\.startsWith\(CACHE_PREFIX\)&&key!==CACHE/);
  assert.match(sw,/matchAll\(\{type:'window',includeUncontrolled:true\}\)/);
  assert.match(sw,/UPDATE_ACTIVATED/);
  assert.match(client,/controllerchange/);
});

test('navigation remains network-first with an offline fallback',()=>{
  assert.match(sw,/request\.mode==='navigate'/);
  assert.match(sw,/caches\.match\(BASE\+'offline\/'\)/);
});

test('all required visible states are implemented',()=>{
  for(const state of ['Aktuell','Prüfe auf Aktualisierung …','Neue Version verfügbar','Offline – Aktualisierungsprüfung nicht möglich','Aktualisierung fehlgeschlagen'])assert.match(client,new RegExp(state));
});
