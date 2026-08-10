import fs from 'node:fs';import path from 'node:path';
const contentFiles=(dir)=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>{const full=path.join(dir,entry.name);return entry.isDirectory()?contentFiles(full):/\.mdx?$/.test(entry.name)?[full]:[]});
const frontmatter=(content)=>content.split(/^---\s*$/m)[1]||'';
const field=(content,name)=>frontmatter(content).match(new RegExp(`^${name}:\\s*["']?(.+?)["']?\\s*$`,'m'))?.[1];
const hasLegacySchedule=(content,name)=>{const data=frontmatter(content);const inline=data.match(new RegExp(`^${name}:\\s*(.+)$`,'m'))?.[1]?.trim();return Boolean((inline&&inline!=='[]')||new RegExp(`^${name}:\\s*\\r?\\n\\s+-\\s`,'m').test(data))};
const roots=['reisen','reisetage','orte','sehenswuerdigkeiten','unterkuenfte','restaurants','genuss','wissen','praktisches'];let fail=[];const pageIds=new Map();for(const root of roots){for(const f of fs.readdirSync(`src/content/${root}`)){const s=fs.readFileSync(`src/content/${root}/${f}`,'utf8');for(const key of ['title:','slug:','sources:','updated:'])if(!s.includes(key))fail.push(`${root}/${f}: ${key} fehlt`);const id=s.match(/^pageId:\s*(\d+)\s*$/m)?.[1];if(id){const previous=pageIds.get(id);if(previous)fail.push(`Seiten-ID ${id} doppelt: ${previous} und ${root}/${f}`);pageIds.set(id,`${root}/${f}`)}if(['restaurants','unterkuenfte'].includes(root)&&!id)fail.push(`${root}/${f}: Seiten-ID fehlt`)}}
const trips=new Map();for(const file of contentFiles('src/content/reisen')){const content=fs.readFileSync(file,'utf8'),slug=field(content,'slug'),routeSlug=field(content,'routeSlug');if(!slug||!routeSlug)fail.push(`${file}: slug oder routeSlug fehlt`);else if(trips.has(slug)||[...trips.values()].includes(routeSlug))fail.push(`${file}: Reise-Slug oder routeSlug doppelt`);else trips.set(slug,routeSlug)}for(const root of roots){for(const file of contentFiles(`src/content/${root}`)){const content=fs.readFileSync(file,'utf8'),trip=field(content,'trip');if(!trip||!trips.has(trip))fail.push(`${file}: unbekannte oder fehlende Reise ${trip||'–'}`);if(root==='reisetage'&&/^##\s+Tagesablauf\s*$/mi.test(content)&&(hasLegacySchedule(content,'fixed')||hasLegacySchedule(content,'recommended')))fail.push(`${file}: Tagesablauf darf nicht zugleich in fixed/recommended gepflegt werden`)}}
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
  const placeholder=/images\/platzhalter\.png$/.test(image);if(/georgia-route\.svg|default/i.test(image))fail.push(`${root}/${f}: ungeeignetes Bild`);if(placeholder&&!/^imageStatus:\s*platzhalter\s*$/m.test(s))fail.push(`${root}/${f}: Platzhalter ohne imageStatus`);
  const target=path.join('public',image.replace(/^\//,''));if(!fs.existsSync(target))fail.push(`${root}/${f}: Bilddatei fehlt ${image}`);
  const prior=used.get(image)||[];prior.push(`${root}/${f}`);used.set(image,prior);
  if(!/^imageAlt:\s*\S/m.test(s))fail.push(`${root}/${f}: präziser Alternativtext fehlt`);
}
for(const [image,files] of used)if(files.length>1&&!/images\/platzhalter\.png$/.test(image))fail.push(`${image}: identisch auf ${files.length} Item-Seiten`);
if(fail.length){console.error(fail.join('\n'));process.exit(1)}
