import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const items = [
  ['orte','batumi','Batumi Georgia'], ['orte','kutaisi','Kutaisi Georgia'], ['orte','mtskheta','Mtskheta Georgia'], ['orte','shekvetili','Shekvetili Georgia'], ['orte','stepantsminda','Stepantsminda Kazbegi Georgia'], ['orte','tbilisi','Tbilisi Georgia'], ['orte','vardzia','Vardzia Georgia'],
  ['sehenswuerdigkeiten','botanischer-garten-batumi','Batumi Botanical Garden Georgia'], ['sehenswuerdigkeiten','gelati','Gelati Monastery Georgia'], ['sehenswuerdigkeiten','gergeti','Gergeti Trinity Church Georgia'], ['sehenswuerdigkeiten','heerstrasse','Georgian Military Road Georgia'], ['sehenswuerdigkeiten','narikala','Narikala Fortress Tbilisi'], ['sehenswuerdigkeiten','prometheus','Prometheus Cave Georgia'], ['sehenswuerdigkeiten','schwefelbaeder','Tbilisi sulfur baths'], ['sehenswuerdigkeiten','vardzia','Vardzia cave city Georgia'],
  ['genuss','adscharisches-chatschapuri','Adjarian khachapuri'], ['genuss','chacha','Chacha alcohol Georgia|Georgian brandy'], ['genuss','chatschapuri','Khachapuri'], ['genuss','chinkali','Khinkali'], ['genuss','lobio','Lobio Georgian food'], ['genuss','mzwadi','Mtsvadi Georgian food'], ['genuss','pchali','Pkhali Georgian food'], ['genuss','qvevri-wein','Qvevri wine Georgia'],
  ['restaurants','360-sky-bar','360 Sky Bar Batumi|Batumi Georgia'], ['restaurants','baias-wine','Baia wine Georgia|Georgian wine'], ['restaurants','barbarestan','Barbarestan Tbilisi|Tbilisi Georgia'], ['restaurants','keto-kote','Keto and Kote Tbilisi|Tbilisi Georgia'], ['restaurants','laguna','Laguna Batumi restaurant|Batumi Georgia'], ['restaurants','palaty','Palaty Kutaisi|Kutaisi Georgia'], ['restaurants','pasanauri','Pasanauri restaurant Tbilisi|Tbilisi Georgia'],
  ['unterkuenfte','1740-boutique','1740 Boutique Hotel Tbilisi|Tbilisi Georgia'], ['unterkuenfte','castello-mare','Castello Mare Hotel Georgia|Batumi Georgia'], ['unterkuenfte','el-hotel','EL Hotel Georgia|Tbilisi Georgia'], ['unterkuenfte','georgia-palace','Georgia Palace Hotel Kobuleti|Kobuleti Georgia'], ['unterkuenfte','hotel-pavo','Hotel Pavo Tbilisi|Tbilisi Georgia'], ['unterkuenfte','magnetic-resort','Magnetic Resort Shekvetili|Shekvetili Georgia'], ['unterkuenfte','miramare','Miramare Hotel Batumi|Batumi Georgia'], ['unterkuenfte','newport-kutaisi','Newport Hotel Kutaisi|Kutaisi Georgia'], ['unterkuenfte','old-town-mtatsminda','Old Town Mtatsminda Hotel Tbilisi|Tbilisi Georgia'], ['unterkuenfte','paragraph','Paragraph Resort Shekvetili|Shekvetili Georgia'], ['unterkuenfte','rooms-kazbegi','Rooms Hotel Kazbegi|Stepantsminda Georgia']
];
const base = 'https://commons.wikimedia.org/w/rest.php/v1';
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
const getJson = async url => {
  for (let attempt = 0; attempt < 4; attempt++) {
    const response = await fetch(url, {headers:{'user-agent':'reisen-image-fetcher/1.0'}});
    if (response.ok) return response.json();
    if (response.status !== 429 || attempt === 3) throw new Error(`${response.status} ${url}`);
    await wait(5000 * (attempt + 1));
  }
};
const getImage = async url => {
  for (let attempt = 0; attempt < 4; attempt++) {
    const response = await fetch(url, {headers:{'user-agent':'reisen-image-fetcher/1.0'}});
    if (response.ok) return response;
    if (response.status !== 429 || attempt === 3) throw new Error(`${response.status} ${url}`);
    await wait(5000 * (attempt + 1));
  }
};
const clean = value => String(value || '').replace(/<[^>]+>/g, '').replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const yaml = value => JSON.stringify(value);

const records = [];
for (const [category, slug, query] of items) {
  const target = `public/images/georgien/${category}/${slug}.jpg`;
  if (existsSync(target)) { console.log(`${category}/${slug}: already downloaded`); continue; }
  let file;
  for (const alternative of query.split('|')) {
    const search = await getJson(`${base}/search/page?q=${encodeURIComponent(`File:${alternative}`)}&limit=20`);
    const candidates = search.pages.filter(page => page.key.startsWith('File:') && page.thumbnail?.mimetype === 'image/jpeg');
    file = candidates[slug.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) % candidates.length];
    if (file) break;
  }
  if (!file) throw new Error(`No JPEG result for ${category}/${slug}`);
  const detail = await getJson(`${base}/page/${encodeURIComponent(file.key)}/with_html`);
  if (!/Creative Commons|Public domain|CC0/i.test(detail.license?.title || '')) throw new Error(`No compatible license for ${file.key}`);
  const html = detail.html;
  const author = clean(html.match(/id="fileinfotpl_aut"[\s\S]*?<td[^>]*>([\s\S]*?)<\/td>/)?.[1]) || 'Wikimedia Commons contributors';
  const description = clean(html.match(/id="fileinfotpl_desc"[\s\S]*?<td class="description">([\s\S]*?)<\/td>/)?.[1]) || file.title.replace(/^File:/, '').replace(/\.[^.]+$/, '');
  const imageUrl = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file.title.replace(/^File:/, ''))}?width=1600`;
  await mkdir(`public/images/georgien/${category}`, {recursive:true});
  const image = await getImage(imageUrl);
  await writeFile(target, Buffer.from(await image.arrayBuffer()));
  const imagePath = `images/georgien/${category}/${slug}.jpg`;
  const contentPath = `src/content/${category}/${slug}.md`;
  let content = await readFile(contentPath, 'utf8');
  const frontMatter = [
    `image: ${imagePath}`,
    `imageAlt: ${yaml(description)}`,
    'imageCredit:',
    `  creator: ${yaml(author)}`,
    `  originalUrl: ${yaml(`https://commons.wikimedia.org/wiki/${encodeURIComponent(file.key)}`)}`,
    `  license: ${yaml(detail.license.title)}`,
    '  edited: "Lokaler Zuschnitt auf höchstens 1600 Pixel Breite; keine inhaltliche Bearbeitung."',
    '  accessed: 2026-08-06'
  ].join('\n');
  content = content.replace(/updated: ([^\r\n]+)(\r?\n)/, `updated: $1$2${frontMatter}$2`);
  await writeFile(contentPath, content);
  records.push({category, slug, file:file.title, author, license:detail.license.title, description, source:`https://commons.wikimedia.org/wiki/${encodeURIComponent(file.key)}`});
  console.log(`${category}/${slug}: ${file.title}`);
}
await writeFile('scripts/georgien-image-selection.json', JSON.stringify(records, null, 2));
