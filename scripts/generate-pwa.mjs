import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const base = '/reisen/';
let build = process.env.GITHUB_SHA;
if (!build) {
  build = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
}
build = build.slice(0, 12);

const template = readFileSync('scripts/pwa/sw-template.js', 'utf8');
writeFileSync('public/sw.js', template.replaceAll('__BUILD_ID__', build));
writeFileSync('public/version.json', `${JSON.stringify({ build, base })}\n`);
console.log(`PWA-Build ${build} erzeugt.`);
