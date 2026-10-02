import fs from 'node:fs';
import path from 'node:path';
import { normalizeRegion } from '../src/lib/regions.mjs';

const contentFiles = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  const full = path.join(dir, entry.name);
  return entry.isDirectory() ? contentFiles(full) : /\.mdx?$/.test(entry.name) ? [full] : [];
});
const frontmatter = (content) => content.split(/^---\s*$/m)[1] || '';
const field = (content, name) => frontmatter(content).match(new RegExp(`^${name}:\\s*["']?(.+?)["']?\\s*$`, 'm'))?.[1];
const hasLegacySchedule = (content, name) => {
  const data = frontmatter(content);
  const inline = data.match(new RegExp(`^${name}:\\s*(.+)$`, 'm'))?.[1]?.trim();
  return Boolean((inline && inline !== '[]') || new RegExp(`^${name}:\\s*\\r?\\n\\s+-\\s`, 'm').test(data));
};

const roots = ['reisen', 'reisetage', 'tagebuch', 'orte', 'sehenswuerdigkeiten', 'unterkuenfte', 'restaurants', 'genuss', 'wissen', 'praktisches'];
const failures = [];
const pageIds = new Map();

for (const root of roots) {
  for (const fileName of fs.readdirSync(`src/content/${root}`)) {
    const content = fs.readFileSync(`src/content/${root}/${fileName}`, 'utf8');
    for (const key of ['title:', 'slug:', 'updated:', ...(root === 'tagebuch' ? [] : ['sources:'])]) {
      if (!content.includes(key)) failures.push(`${root}/${fileName}: ${key} fehlt`);
    }
    const id = content.match(/^pageId:\s*(\d+)\s*$/m)?.[1];
    if (id) {
      const previous = pageIds.get(id);
      if (previous) failures.push(`Seiten-ID ${id} doppelt: ${previous} und ${root}/${fileName}`);
      pageIds.set(id, `${root}/${fileName}`);
    }
    if (['restaurants', 'unterkuenfte'].includes(root) && !id) failures.push(`${root}/${fileName}: Seiten-ID fehlt`);
  }
}

const trips = new Map();
for (const file of contentFiles('src/content/reisen')) {
  const content = fs.readFileSync(file, 'utf8');
  const slug = field(content, 'slug');
  const routeSlug = field(content, 'routeSlug');
  if (!slug || !routeSlug) failures.push(`${file}: slug oder routeSlug fehlt`);
  else if (trips.has(slug) || [...trips.values()].includes(routeSlug)) failures.push(`${file}: Reise-Slug oder routeSlug doppelt`);
  else trips.set(slug, routeSlug);
}
for (const root of roots) {
  for (const file of contentFiles(`src/content/${root}`)) {
    const content = fs.readFileSync(file, 'utf8');
    const trip = field(content, 'trip');
    if (!trip || !trips.has(trip)) failures.push(`${file}: unbekannte oder fehlende Reise ${trip || '–'}`);
    if (root === 'reisetage' && /^##\s+Tagesablauf\s*$/mi.test(content) && (hasLegacySchedule(content, 'fixed') || hasLegacySchedule(content, 'recommended'))) {
      failures.push(`${file}: Tagesablauf darf nicht zugleich in fixed/recommended gepflegt werden`);
    }
  }
}

for (const file of fs.readdirSync('public', { recursive: true })) {
  if (String(file).includes('Georgienreise_')) failures.push('Privates Eingabedokument in public');
}

const astro = fs.readFileSync('astro.config.mjs', 'utf8');
const manifest = fs.readFileSync('public/manifest.webmanifest', 'utf8');
const sw = fs.readFileSync('public/sw.js', 'utf8');
if (!astro.includes("base:'/reisen'")) failures.push('Astro-Basispfad');
if (!manifest.includes('/reisen/')) failures.push('Manifest-Basispfad');
if (!sw.includes("BASE='/reisen/'")) failures.push('SW-Basispfad');

const imageCollections = ['orte', 'sehenswuerdigkeiten', 'unterkuenfte', 'restaurants', 'genuss'];
const usedImages = new Map();
for (const root of imageCollections) {
  for (const fileName of fs.readdirSync(`src/content/${root}`)) {
    const content = fs.readFileSync(`src/content/${root}/${fileName}`, 'utf8');
    const match = content.match(/^image:\s*["']?([^"'\n]+)["']?$/m);
    if (!match) {
      failures.push(`${root}/${fileName}: kein rechtlich geklärtes lokales Bild`);
      continue;
    }
    const image = match[1].trim();
    if (/^https?:/.test(image)) failures.push(`${root}/${fileName}: externer Bild-Hotlink`);
    const placeholder = /images\/platzhalter\.png$/.test(image);
    if (/georgia-route\.svg|default/i.test(image)) failures.push(`${root}/${fileName}: ungeeignetes Bild`);
    if (placeholder && !/^imageStatus:\s*platzhalter\s*$/m.test(content)) failures.push(`${root}/${fileName}: Platzhalter ohne imageStatus`);
    if (!fs.existsSync(path.join('public', image.replace(/^\//, '')))) failures.push(`${root}/${fileName}: Bilddatei fehlt ${image}`);
    usedImages.set(image, [...(usedImages.get(image) || []), `${root}/${fileName}`]);
    if (!/^imageAlt:\s*\S/m.test(content)) failures.push(`${root}/${fileName}: präziser Alternativtext fehlt`);
  }
}
for (const [image, files] of usedImages) {
  if (files.length > 1 && !/images\/platzhalter\.png$/.test(image)) failures.push(`${image}: identisch auf ${files.length} Item-Seiten`);
}
for (const root of imageCollections) {
  for (const file of contentFiles(`src/content/${root}`)) {
    const region = field(fs.readFileSync(file, 'utf8'), 'region')?.replace(/^['"]|['"]$/g, '');
    if (region && !normalizeRegion(region)) failures.push(`${file}: unbekannter Regionswert ${region}`);
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log('Quellen geprüft: Frontmatter, Reisen, Datenschutz, Bilder und Regionen.');
