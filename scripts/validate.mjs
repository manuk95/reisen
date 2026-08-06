import fs from 'node:fs';import path from 'node:path';
const roots=['reisen','reisetage','orte','sehenswuerdigkeiten','unterkuenfte','restaurants','genuss','wissen','praktisches'];let fail=[];for(const root of roots){for(const f of fs.readdirSync(`src/content/${root}`)){const s=fs.readFileSync(`src/content/${root}/${f}`,'utf8');for(const key of ['title:','slug:','sources:','updated:'])if(!s.includes(key))fail.push(`${root}/${f}: ${key} fehlt`)}}
for(const f of fs.readdirSync('public',{recursive:true})){if(String(f).includes('Georgienreise_'))fail.push('Privates Eingabedokument in public')}
const astro=fs.readFileSync('astro.config.mjs','utf8'),manifest=fs.readFileSync('public/manifest.webmanifest','utf8'),sw=fs.readFileSync('public/sw.js','utf8');if(!astro.includes("base:'/reisen'"))fail.push('Astro-Basispfad');if(!manifest.includes('/reisen/'))fail.push('Manifest-Basispfad');if(!sw.includes("BASE='/reisen/'"))fail.push('SW-Basispfad');if(fail.length){console.error(fail.join('\n'));process.exit(1)}console.log('Metadaten, Datenschutz und /reisen/-Basispfade geprüft.');


if (fs.existsSync('dist')) {
  const htmlFiles = [];
  const walk = (dir) => { for (const ent of fs.readdirSync(dir, { withFileTypes: true })) { const full = path.join(dir, ent.name); if (ent.isDirectory()) walk(full); else if (full.endsWith('.html')) htmlFiles.push(full); } };
  walk('dist');
  const existing = new Set(htmlFiles.map((f) => {
    const relative = path.relative('dist', f).replace(/\\/g, '/');
    return '/' + relative.replace(/(^|\/)index\.html$/, '$1');
  }));
  existing.add('/');
  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, 'utf8');
    if (/Reisetage:\s*tag-\d{2}/.test(html)) fail.push(`${file}: sichtbarer roher Reisetag-Slug`);
    for (const m of html.matchAll(/href="([^"]*)"/g)) {
      const href = m[1];
      if (!href || href.startsWith('#') || /^(https?:|mailto:|tel:)/.test(href) || /\.(?:css|js|svg|webmanifest|png|jpe?g|webp|woff2?)(?:[?#]|$)/.test(href)) continue;
      const clean = href.replace('/reisen', '').split(/[?#]/)[0];
      if (clean.startsWith('/') && !existing.has(clean.endsWith('/') ? clean : clean + '/')) fail.push(`${file}: interner Link fehlt ${href}`);
    }
  }
}

// Bildaudit: meldet fehlende, externe, kaputte und wiederverwendete Item-Bilder.
const imageCollections=['orte','sehenswuerdigkeiten','unterkuenfte','restaurants','genuss'];
const used=new Map();
for(const root of imageCollections) for(const f of fs.readdirSync(`src/content/${root}`)){
  const s=fs.readFileSync(`src/content/${root}/${f}`,'utf8');const m=s.match(/^image:\s*["']?([^"'\n]+)["']?$/m);
  if(!m){fail.push(`${root}/${f}: kein rechtlich geklärtes lokales Bild`);continue}
  const image=m[1].trim();if(/^https?:/.test(image))fail.push(`${root}/${f}: externer Bild-Hotlink`);
  if(/georgia-route\.svg|placeholder|default/i.test(image) && !/georgische-flagge\.svg$/.test(image))fail.push(`${root}/${f}: Platzhalter-/Routenbild`);
  const target=path.join('public',image.replace(/^\//,''));if(!fs.existsSync(target))fail.push(`${root}/${f}: Bilddatei fehlt ${image}`);
  const prior=used.get(image)||[];prior.push(`${root}/${f}`);used.set(image,prior);
  if(!/^imageAlt:\s*\S/m.test(s))fail.push(`${root}/${f}: präziser Alternativtext fehlt`);
}
for(const [image,files] of used)if(files.length>1&&!/georgische-flagge\.svg$/.test(image))fail.push(`${image}: identisch auf ${files.length} Item-Seiten`);
if(fail.length){console.error(fail.join('\n'));process.exit(1)}
