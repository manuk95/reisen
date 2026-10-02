import fs from 'node:fs';
import path from 'node:path';

const buildDirectory = 'dist';
if (!fs.existsSync(buildDirectory) || !fs.statSync(buildDirectory).isDirectory()) {
  console.error('Build-Validierung abgebrochen: dist/ fehlt. Zuerst `npm run build` ausführen.');
  process.exit(1);
}

const htmlFiles = [];
const walk = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (full.endsWith('.html')) htmlFiles.push(full);
  }
};
walk(buildDirectory);

const existingRoutes = new Set(htmlFiles.map((file) => {
  const relative = path.relative(buildDirectory, file).replace(/\\/g, '/');
  return `/${relative.replace(/(^|\/)index\.html$/, '$1')}`;
}));
existingRoutes.add('/');

const failures = [];
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  if (/Reisetage:\s*tag-\d{2}/.test(html)) failures.push(`${file}: sichtbarer roher Reisetag-Slug`);
  for (const match of html.matchAll(/href="([^"]*)"/g)) {
    const href = match[1];
    if (!href || href.startsWith('#') || /^(https?:|mailto:|tel:)/.test(href) || /\.(?:css|js|svg|webmanifest|png|jpe?g|webp|woff2?)(?:[?#]|$)/.test(href)) continue;
    const clean = href.replace(/^\/reisen(?=\/|$)/, '').split(/[?#]/)[0];
    const route = clean.endsWith('/') ? clean : `${clean}/`;
    if (clean.startsWith('/') && !existingRoutes.has(route)) failures.push(`${file}: interner Link fehlt ${href}`);
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log('Build geprüft: interne Links und sichtbare rohe Slugs.');
