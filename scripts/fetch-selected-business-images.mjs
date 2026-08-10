import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

const entries = [
  {
    content: 'src/content/restaurants/360-sky-bar.md',
    output: 'public/images/georgien/restaurants/360-sky-bar.jpg',
    file: 'Sheraton Hotel Batumi.jpg',
    alt: 'Sheraton Batumi, in dessen 20. Stock sich die 360 Sky Bar befindet',
    credit: 'Nino Keller',
    source: 'https://commons.wikimedia.org/wiki/File:Sheraton_Hotel_Batumi.jpg',
    license: 'CC BY-SA 4.0',
  },
  {
    content: 'src/content/restaurants/baias-wine.md',
    output: 'public/images/georgien/restaurants/baias-wine.jpg',
    file: 'Tsolikouri.jpg',
    alt: 'Tsolikouri-Reben als Kontextbild für Baia’s Wine und den imeretischen Weinbau',
    credit: 'M.',
    source: 'https://commons.wikimedia.org/wiki/File:Tsolikouri.jpg',
    license: 'CC BY-SA 4.0',
  },
  {
    content: 'src/content/restaurants/barbarestan.md',
    output: 'public/images/georgien/restaurants/barbarestan.jpg',
    file: 'ბარბარე ჯორჯაძე.jpg',
    alt: 'Barbare Eristavi-Jorjadze, deren historisches Kochbuch Barbarestan inspiriert',
    credit: 'Barbarestan',
    source: 'https://commons.wikimedia.org/wiki/File:ბარბარე_ჯორჯაძე.jpg',
    license: 'CC BY-SA 4.0',
  },
  {
    content: 'src/content/restaurants/keto-kote.md',
    output: 'public/images/georgien/restaurants/keto-kote.jpg',
    file: 'Victor Dolidze - Keto and Kote.jpg',
    alt: 'Historisches Motiv zur georgischen Oper Keto and Kote, der Namensgeberin des Restaurants',
    credit: 'Paata Vardanashvili',
    source: 'https://commons.wikimedia.org/wiki/File:Victor_Dolidze_-_Keto_and_Kote.jpg',
    license: 'CC BY 2.0',
  },
  {
    content: 'src/content/restaurants/laguna.md',
    output: 'public/images/georgien/restaurants/laguna.jpg',
    file: 'Adjarian khachapuri.jpg',
    alt: 'Adscharisches Chatschapuri als Spezialität des Restaurants Laguna in Batumi',
    credit: 'Eka Samkharadze',
    source: 'https://commons.wikimedia.org/wiki/File:Adjarian_khachapuri.jpg',
    license: 'CC BY-SA 4.0',
  },
  {
    content: 'src/content/restaurants/palaty.md',
    output: 'public/images/georgien/restaurants/palaty.jpg',
    file: 'At Bar-Restaurant Palaty in Kutaisi, Georgia.jpg',
    alt: 'Innenansicht des Bar-Restaurants Palaty in Kutaisi',
    credit: 'Vít Hnilica',
    source: 'https://commons.wikimedia.org/wiki/File:At_Bar-Restaurant_Palaty_in_Kutaisi,_Georgia.jpg',
    license: 'Public Domain Mark 1.0',
  },
  {
    content: 'src/content/restaurants/pasanauri.md',
    output: 'public/images/georgien/restaurants/pasanauri.jpg',
    file: 'Entry Pasanauri, GE.jpg',
    alt: 'Ortseinfahrt von Pasanauri an der Georgischen Heerstrasse als Kontextbild zum Restaurantnamen',
    credit: 'Raf24~commonswiki',
    source: 'https://commons.wikimedia.org/wiki/File:Entry_Pasanauri,_GE.jpg',
    license: 'CC BY-SA 4.0',
  },
  {
    content: 'src/content/unterkuenfte/1740-boutique.md',
    output: 'public/images/georgien/unterkuenfte/1740-boutique.jpg',
    file: 'Kazbegi, Stepantsminda, Panoramic view, Georgia.jpg',
    alt: 'Panorama von Stepantsminda und der Kaukasuslandschaft als Kontextbild zum 1740 Boutique Hotel Kazbegi',
    credit: 'Vyacheslav Argenberg',
    source: 'https://commons.wikimedia.org/wiki/File:Kazbegi,_Stepantsminda,_Panoramic_view,_Georgia.jpg',
    license: 'CC BY 4.0',
  },
  {
    content: 'src/content/unterkuenfte/castello-mare.md',
    output: 'public/images/georgien/unterkuenfte/castello-mare.jpg',
    file: 'Black Sea in Tsikhisdziri, Georgia.jpg',
    alt: 'Schwarzmeerküste bei Tsikhisdziri als Kontextbild zur Lage des Castello Mare Hotel & Wellness Resort',
    credit: 'Alexey Komarov',
    source: 'https://commons.wikimedia.org/wiki/File:Black_Sea_in_Tsikhisdziri,_Georgia.jpg',
    license: 'CC BY-SA 4.0',
  },
  {
    content: 'src/content/unterkuenfte/el-hotel.md',
    output: 'public/images/georgien/unterkuenfte/el-hotel.jpg',
    file: '2010-03 Kutaisi (Georgien) - Blick über den Rioni.jpg',
    alt: 'Blick über den Rioni in Kutaisi als Kontextbild zur Lage des EL Hotel',
    credit: 'Matthias Bethke',
    source: 'https://commons.wikimedia.org/wiki/File:2010-03_Kutaisi_(Georgien)_-_Blick_über_den_Rioni.jpg',
    license: 'CC BY-SA 4.0',
  },
  {
    content: 'src/content/unterkuenfte/georgia-palace.md',
    output: 'public/images/georgien/unterkuenfte/georgia-palace.jpg',
    file: 'Kobuleti Beach.JPG',
    alt: 'Strand von Kobuleti als Kontextbild zur Küstenlage des Georgia Palace Hotel & Spa',
    credit: 'MIKHEIL',
    source: 'https://commons.wikimedia.org/wiki/File:Kobuleti_Beach.JPG',
    license: 'CC BY-SA 4.0',
  },
  {
    content: 'src/content/unterkuenfte/hotel-pavo.md',
    output: 'public/images/georgien/unterkuenfte/hotel-pavo.jpg',
    file: 'Panoramic view of Tbilisi from Mtatsminda Park.JPG',
    alt: 'Panoramablick über Tbilisi als Kontextbild zur Lage des Hotel Pavo',
    credit: 'Kober',
    source: 'https://commons.wikimedia.org/wiki/File:Panoramic_view_of_Tbilisi_from_Mtatsminda_Park.JPG',
    license: 'CC BY-SA 3.0',
  },
  {
    content: 'src/content/unterkuenfte/magnetic-resort.md',
    output: 'public/images/georgien/unterkuenfte/magnetic-resort.jpg',
    file: 'Sunset on the Black Sea coast of Ureki, Georgia (Europe).jpg',
    alt: 'Sonnenuntergang an der Schwarzmeerküste von Ureki als Kontextbild zum Magnetic Resort',
    credit: 'Kakha Kolkhi',
    source: 'https://commons.wikimedia.org/wiki/File:Sunset_on_the_Black_Sea_coast_of_Ureki,_Georgia_(Europe).jpg',
    license: 'CC BY-SA 2.0',
  },
  {
    content: 'src/content/unterkuenfte/miramare.md',
    output: 'public/images/georgien/unterkuenfte/miramare.jpg',
    file: 'Ureki.jpg',
    alt: 'Schwarzmeerküste von Ureki als Kontextbild zur Lage des Miramare Magnetic Beach Hotel',
    credit: 'M.',
    source: 'https://commons.wikimedia.org/wiki/File:Ureki.jpg',
    license: 'CC BY 3.0',
  },
  {
    content: 'src/content/unterkuenfte/newport-kutaisi.md',
    output: 'public/images/georgien/unterkuenfte/newport-kutaisi.jpg',
    file: 'Kutaisi Panorama.jpg',
    alt: 'Panorama von Kutaisi als Kontextbild zur zentralen Lage des Newport Hotel Kutaisi',
    credit: 'Marcin Konsek',
    source: 'https://commons.wikimedia.org/wiki/File:Kutaisi_Panorama.jpg',
    license: 'CC BY-SA 4.0',
  },
  {
    content: 'src/content/unterkuenfte/old-town-mtatsminda.md',
    output: 'public/images/georgien/unterkuenfte/old-town-mtatsminda.jpg',
    file: 'View of Tbilisi from Mt Mtatsminda (1).jpg',
    alt: 'Blick von Mtatsminda über Tbilisi als Kontextbild zum Old Town Mtatsminda',
    credit: 'Kober',
    source: 'https://commons.wikimedia.org/wiki/File:View_of_Tbilisi_from_Mt_Mtatsminda_(1).jpg',
    license: 'Public domain',
  },
  {
    content: 'src/content/unterkuenfte/paragraph.md',
    output: 'public/images/georgien/unterkuenfte/paragraph.jpg',
    file: 'Shekvetili Praia.jpg',
    alt: 'Strand von Shekvetili als Kontextbild zur Lage des Paragraph Resort & Spa',
    credit: 'Iscream icecream',
    source: 'https://commons.wikimedia.org/wiki/File:Shekvetili_Praia.jpg',
    license: 'CC BY-SA 4.0',
  },
  {
    content: 'src/content/unterkuenfte/rooms-kazbegi.md',
    output: 'public/images/georgien/unterkuenfte/rooms-kazbegi.jpg',
    file: 'Rooms Hotel Kazbegi.jpg',
    alt: 'Panoramablick vom Rooms Hotel Kazbegi auf Stepantsminda und den Kaukasus',
    credit: 'AdnanDekedek',
    source: 'https://commons.wikimedia.org/wiki/File:Rooms_Hotel_Kazbegi.jpg',
    license: 'CC BY-SA 4.0',
  },
];

function yamlString(value) {
  return JSON.stringify(value);
}

function upsertFrontmatterField(text, key, value) {
  const line = `${key}: ${value}`;
  const re = new RegExp(`^${key}:.*$`, 'm');
  if (re.test(text)) return text.replace(re, line);

  const closing = text.indexOf('\n---\n', 4);
  if (closing === -1) throw new Error(`No frontmatter closing marker while adding ${key}`);
  return `${text.slice(0, closing)}\n${line}${text.slice(closing)}`;
}

async function resolveCommonsThumbnail(filename) {
  const api = new URL('https://commons.wikimedia.org/w/api.php');
  api.searchParams.set('action', 'query');
  api.searchParams.set('format', 'json');
  api.searchParams.set('prop', 'imageinfo');
  api.searchParams.set('iiprop', 'url|mime');
  api.searchParams.set('iiurlwidth', '1600');
  api.searchParams.set('titles', `File:${filename}`);

  const response = await fetch(api, {
    headers: { 'User-Agent': 'reisen-georgien-image-fetcher/1.0 (GitHub Pages travel guide)' },
  });
  if (!response.ok) throw new Error(`Commons API ${response.status} for ${filename}`);
  const data = await response.json();
  const page = Object.values(data.query?.pages ?? {})[0];
  const info = page?.imageinfo?.[0];
  if (!info?.url) throw new Error(`No Commons image found for ${filename}`);
  return info.thumburl || info.url;
}

async function downloadImage(entry) {
  const url = await resolveCommonsThumbnail(entry.file);
  const response = await fetch(url, {
    headers: { 'User-Agent': 'reisen-georgien-image-fetcher/1.0 (GitHub Pages travel guide)' },
  });
  if (!response.ok) throw new Error(`Image download ${response.status} for ${entry.file}`);
  const type = response.headers.get('content-type') || '';
  if (!type.startsWith('image/')) throw new Error(`Unexpected content type ${type} for ${entry.file}`);
  await mkdir(dirname(entry.output), { recursive: true });
  await writeFile(entry.output, Buffer.from(await response.arrayBuffer()));
  console.log(`Downloaded ${entry.file} -> ${entry.output}`);
}

async function updateContent(entry) {
  let text = await readFile(entry.content, 'utf8');
  const publicPath = entry.output.replace(/^public\//, '');
  const fields = {
    updated: '2026-08-10',
    image: yamlString(publicPath),
    imageAlt: yamlString(entry.alt),
    imageStatus: 'lizenziert',
    imageCredit: yamlString(entry.credit),
    imageSource: yamlString(entry.source),
    imageLicense: yamlString(entry.license),
    imageEdit: yamlString('Auf ca. 1600 px Breite skaliert; keine inhaltliche Bearbeitung.'),
  };
  for (const [key, value] of Object.entries(fields)) text = upsertFrontmatterField(text, key, value);
  await writeFile(entry.content, text, 'utf8');
  console.log(`Updated frontmatter ${entry.content}`);
}

for (const entry of entries) {
  await downloadImage(entry);
  await updateContent(entry);
}

console.log(`Finished ${entries.length} curated business images.`);
