import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { dirname, extname } from 'node:path';

const items = [
  {
    collection: 'unterkuenfte', folder: 'hotels', slug: 'hotel-pavo',
    download: { type: 'commons', file: 'View of Tbilisi from Mt Mtatsminda (1).jpg' },
    alt: 'Kontextbild: Panorama von Tbilisi vom Mtatsminda; zeigt nicht das Hotel Pavo selbst.',
    credit: 'Kober / Wikimedia Commons',
    source: 'https://commons.wikimedia.org/wiki/File:View_of_Tbilisi_from_Mt_Mtatsminda_(1).jpg',
    license: 'Public Domain (PD-self)',
    context: true,
    note: 'Das Bild zeigt Tbilisi vom Mtatsminda und dient als klar gekennzeichnetes Umgebungsbild; es zeigt nicht das Hotel Pavo.'
  },
  {
    collection: 'unterkuenfte', folder: 'hotels', slug: 'old-town-mtatsminda',
    download: { type: 'commons', file: 'A View Of Tbilisi.jpg' },
    alt: 'Kontextbild: Blick über Tbilisi vom Mtatsminda Park; zeigt nicht das Old Town Mtatsminda Hotel selbst.',
    credit: 'Philipe12312 / Wikimedia Commons',
    source: 'https://commons.wikimedia.org/wiki/File:A_View_Of_Tbilisi.jpg',
    license: 'CC BY 4.0',
    context: true,
    note: 'Das Bild zeigt einen Blick vom Mtatsminda Park über Tbilisi und dient als klar gekennzeichnetes Umgebungsbild; es zeigt nicht das Hotel selbst.'
  },
  {
    collection: 'unterkuenfte', folder: 'hotels', slug: '1740-boutique',
    download: { type: 'commons', file: 'Stepan-Tsmnda Kazbegi 2013 01.jpg' },
    alt: 'Kontextbild: Bergkulisse von Stepantsminda mit dem Kazbek; zeigt nicht das 1740 Boutique Hotel selbst.',
    credit: 'Kober / Wikimedia Commons',
    source: 'https://commons.wikimedia.org/wiki/File:Stepan-Tsmnda_Kazbegi_2013_01.jpg',
    license: 'CC BY-SA 3.0',
    context: true,
    note: 'Das Bild zeigt die für Stepantsminda typische Kazbek-Kulisse und dient als klar gekennzeichnetes Umgebungsbild; es zeigt nicht das 1740 Boutique Hotel.'
  },
  {
    collection: 'unterkuenfte', folder: 'hotels', slug: 'rooms-kazbegi',
    download: { type: 'unsplash', id: 'y_Yr-xcOaYU' },
    alt: 'Bibliotheks- und Loungebereich im Rooms Hotel Kazbegi.',
    credit: 'Timur Kozmenko / Unsplash',
    source: 'https://unsplash.com/photos/a-library-with-a-lot-of-books-on-the-shelves-y_Yr-xcOaYU',
    license: 'Unsplash License',
    context: false,
    note: 'Das Foto wurde im Rooms Hotel Kazbegi aufgenommen und zeigt dessen Bibliotheks- und Loungebereich.'
  },
  {
    collection: 'unterkuenfte', folder: 'hotels', slug: 'el-hotel',
    download: { type: 'commons', file: 'White Bridge, Kutaisi.jpg' },
    alt: 'Kontextbild: Weisse Brücke und Rioni in Kutaisi; zeigt nicht das EL Hotel selbst.',
    credit: 'Roberto Strauss / Wikimedia Commons',
    source: 'https://commons.wikimedia.org/wiki/File:White_Bridge,_Kutaisi.jpg',
    license: 'CC BY-SA 2.0',
    context: true,
    note: 'Das Bild zeigt die Weisse Brücke im Zentrum von Kutaisi und dient als klar gekennzeichnetes Umgebungsbild; es zeigt nicht das EL Hotel.'
  },
  {
    collection: 'unterkuenfte', folder: 'hotels', slug: 'newport-kutaisi',
    download: { type: 'commons', file: 'White Bridge, Kutaisi (1).jpg' },
    alt: 'Kontextbild: Weisse Brücke am Rioni im Zentrum von Kutaisi; zeigt nicht das Newport Hotel selbst.',
    credit: 'Kober / Wikimedia Commons',
    source: 'https://commons.wikimedia.org/wiki/File:White_Bridge,_Kutaisi_(1).jpg',
    license: 'Public Domain (PD-self)',
    context: true,
    note: 'Das Bild zeigt die Weisse Brücke und den Rioni in Kutaisi und dient als klar gekennzeichnetes Umgebungsbild; es zeigt nicht das Newport Hotel.'
  },
  {
    collection: 'unterkuenfte', folder: 'hotels', slug: 'paragraph',
    download: { type: 'unsplash', id: '93gxTGa_xU0' },
    alt: 'Hotelgebäude am Schwarzen Meer beim Paragraph Resort & Spa Shekvetili.',
    credit: 'Denis Volkov / Unsplash',
    source: 'https://unsplash.com/photos/a-very-tall-building-next-to-a-body-of-water-93gxTGa_xU0',
    license: 'Unsplash License',
    context: false,
    note: 'Das Foto ist am Paragraph Resort & Spa Shekvetili verortet und zeigt das Hotelgebäude am Schwarzen Meer.'
  },
  {
    collection: 'unterkuenfte', folder: 'hotels', slug: 'magnetic-resort',
    download: { type: 'commons', file: 'Sunset on the Black Sea coast of Ureki, Georgia (Europe).jpg' },
    alt: 'Kontextbild: Sonnenuntergang am schwarzen Sandstrand von Ureki; zeigt nicht das Magnetic Resort selbst.',
    credit: 'Kakha Kolkhi / Wikimedia Commons',
    source: 'https://commons.wikimedia.org/wiki/File:Sunset_on_the_Black_Sea_coast_of_Ureki,_Georgia_(Europe).jpg',
    license: 'CC BY-SA 2.0',
    context: true,
    note: 'Das Bild zeigt den schwarzen Sandstrand von Ureki bei Sonnenuntergang und dient als klar gekennzeichnetes Umgebungsbild; es zeigt nicht das Magnetic Resort.'
  },
  {
    collection: 'unterkuenfte', folder: 'hotels', slug: 'miramare',
    download: { type: 'commons', file: 'Kobuleti georgia.jpg' },
    alt: 'Kontextbild: Sonnenuntergang am Schwarzen Meer bei Kobuleti; zeigt nicht das Miramare Magnetic Beach Hotel selbst.',
    credit: 'Armenak Margarian / Wikimedia Commons',
    source: 'https://commons.wikimedia.org/wiki/File:Kobuleti_georgia.jpg',
    license: 'CC BY-SA 4.0',
    context: true,
    note: 'Das Bild zeigt die Schwarzmeerküste bei Kobuleti und dient als klar gekennzeichnetes Umgebungsbild; es zeigt nicht das Miramare Magnetic Beach Hotel.'
  },
  {
    collection: 'unterkuenfte', folder: 'hotels', slug: 'georgia-palace',
    download: { type: 'commons', file: 'Kobuleti Beach.JPG' },
    alt: 'Kontextbild: Strand von Kobuleti am Schwarzen Meer; zeigt nicht das Georgia Palace Hotel & Spa selbst.',
    credit: 'MIKHEIL / Wikimedia Commons',
    source: 'https://commons.wikimedia.org/wiki/File:Kobuleti_Beach.JPG',
    license: 'CC BY-SA 4.0',
    context: true,
    note: 'Das Bild zeigt den Strand von Kobuleti und dient als klar gekennzeichnetes Umgebungsbild; es zeigt nicht das Georgia Palace Hotel & Spa.'
  },
  {
    collection: 'unterkuenfte', folder: 'hotels', slug: 'castello-mare',
    download: { type: 'unsplash', id: 'jQR1lDbU2NU' },
    alt: 'Luftaufnahme des Castello Mare Hotel & Wellness Resort mit Pool und Tennisplatz.',
    credit: 'Aleksandr Galichkin / Unsplash',
    source: 'https://unsplash.com/photos/aerial-view-of-a-mansion-with-pool-and-tennis-court-jQR1lDbU2NU',
    license: 'Unsplash License',
    context: false,
    note: 'Das Foto ist direkt beim Castello Mare Hotel & Wellness Resort verortet und zeigt die Anlage aus der Luft.'
  },
  {
    collection: 'restaurants', folder: 'restaurants', slug: '360-sky-bar',
    download: { type: 'commons', file: 'Panoramic view of Batumi at night.jpg' },
    alt: 'Kontextbild: nächtliches Panorama von Batumi; zeigt nicht die 360 Sky Bar selbst.',
    credit: 'Giorgi Nakashidze / Wikimedia Commons',
    source: 'https://commons.wikimedia.org/wiki/File:Panoramic_view_of_Batumi_at_night.jpg',
    license: 'CC BY-SA 3.0',
    context: true,
    note: 'Das Bild zeigt Batumi bei Nacht und dient als klar gekennzeichnetes Stadt- und Aussichtskontextbild; es zeigt nicht die 360 Sky Bar.'
  },
  {
    collection: 'restaurants', folder: 'restaurants', slug: 'baias-wine',
    download: { type: 'commons', file: 'Qvevri.jpg' },
    alt: 'Kontextbild: traditioneller georgischer Qvevri für die Weinbereitung; zeigt nicht Baia’s Wine selbst.',
    credit: 'Ekkatterrinna / Wikimedia Commons',
    source: 'https://commons.wikimedia.org/wiki/File:Qvevri.jpg',
    license: 'CC BY-SA 4.0',
    context: true,
    note: 'Das Bild zeigt einen traditionellen georgischen Qvevri und dient als klar gekennzeichnetes Wein-Kontextbild; es zeigt nicht Baia’s Wine.'
  },
  {
    collection: 'restaurants', folder: 'restaurants', slug: 'barbarestan',
    download: { type: 'commons', file: 'ბარბარე ჯორჯაძე.jpg' },
    alt: 'Kontextbild: Barbare Eristavi-Jorjadze, deren historisches Kochbuch die Grundlage des Restaurantkonzepts bildet; kein Foto des Restaurants.',
    credit: 'Barbarestan / Wikimedia Commons',
    source: 'https://commons.wikimedia.org/wiki/File:ბარბარე_ჯორჯაძე.jpg',
    license: 'CC BY-SA 4.0',
    context: true,
    note: 'Das Bild zeigt Barbare Eristavi-Jorjadze, die Namensgeberin und inhaltliche Grundlage des Restaurantkonzepts; es zeigt nicht das Restaurant.'
  },
  {
    collection: 'restaurants', folder: 'restaurants', slug: 'keto-kote',
    download: { type: 'commons', file: 'Victor Dolidze - Keto and Kote 4.jpg' },
    alt: 'Kontextbild: Aufführung von Victor Dolidzes «Keto und Kote», auf die der Restaurantname verweist; kein Foto des Restaurants.',
    credit: 'Paata Vardanashvili / Wikimedia Commons',
    source: 'https://commons.wikimedia.org/wiki/File:Victor_Dolidze_-_Keto_and_Kote_4.jpg',
    license: 'CC BY 2.0',
    context: true,
    note: 'Das Bild zeigt eine Aufführung von Victor Dolidzes «Keto und Kote» und erklärt den Namen; es ist bewusst als Kontextbild gekennzeichnet und zeigt nicht das Restaurant.'
  },
  {
    collection: 'restaurants', folder: 'restaurants', slug: 'laguna',
    download: { type: 'commons', file: 'Adjarian khachapuri.jpg' },
    alt: 'Kontextbild: adscharisches Chatschapuri, die Spezialität von Laguna in Batumi; kein Foto des Restaurants.',
    credit: 'Eka Samkharadze / Wikimedia Commons',
    source: 'https://commons.wikimedia.org/wiki/File:Adjarian_khachapuri.jpg',
    license: 'CC BY-SA 4.0',
    context: true,
    note: 'Das Bild zeigt adscharisches Chatschapuri als typische Spezialität von Laguna; es ist bewusst als Kontextbild gekennzeichnet und zeigt nicht das Restaurant.'
  },
  {
    collection: 'restaurants', folder: 'restaurants', slug: 'palaty',
    download: { type: 'commons', file: 'At Bar-Restaurant Palaty in Kutaisi, Georgia.jpg' },
    alt: 'Aufnahme im Bar-Restaurant Palaty in Kutaisi.',
    credit: 'Vít Hnilica / Wikimedia Commons',
    source: 'https://commons.wikimedia.org/wiki/File:At_Bar-Restaurant_Palaty_in_Kutaisi,_Georgia.jpg',
    license: 'Public Domain Mark (via Flickr/Wikimedia Commons)',
    context: false,
    note: 'Das Foto wurde im Bar-Restaurant Palaty in Kutaisi aufgenommen.'
  },
  {
    collection: 'restaurants', folder: 'restaurants', slug: 'pasanauri',
    download: { type: 'commons', file: 'Khinkali.jpg' },
    alt: 'Kontextbild: georgische Chinkali, eine zentrale Spezialität des Restaurants Pasanauri; kein Foto des Restaurants.',
    credit: 'TheMightyQuill / Wikimedia Commons',
    source: 'https://commons.wikimedia.org/wiki/File:Khinkali.jpg',
    license: 'CC BY-SA 2.5',
    context: true,
    note: 'Das Bild zeigt Chinkali als zentrale Spezialität des Restaurants; es ist bewusst als Kontextbild gekennzeichnet und zeigt nicht das Restaurant.'
  }
];

const UA = 'manuk95-reisen-image-curator/1.0 (https://github.com/manuk95/reisen)';

function downloadUrl(spec) {
  if (spec.type === 'commons') {
    return `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(spec.file)}?width=1600`;
  }
  return `https://unsplash.com/photos/${encodeURIComponent(spec.id)}/download?force=true&w=1600&fm=jpg`;
}

async function fetchImage(url, target) {
  const response = await fetch(url, {
    redirect: 'follow',
    headers: { 'User-Agent': UA, Accept: 'image/avif,image/webp,image/jpeg,image/*,*/*;q=0.8' }
  });
  if (!response.ok) throw new Error(`Download fehlgeschlagen ${response.status}: ${url}`);
  const type = response.headers.get('content-type') || '';
  if (!type.startsWith('image/')) throw new Error(`Unerwarteter Content-Type ${type}: ${url}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 10_000) throw new Error(`Bilddatei unerwartet klein (${bytes.length} Bytes): ${url}`);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, bytes);
}

function yaml(value) {
  return JSON.stringify(value);
}

function setFrontmatterField(text, key, value) {
  const first = text.indexOf('---');
  const end = text.indexOf('\n---', first + 3);
  if (first !== 0 || end < 0) throw new Error(`Frontmatter nicht gefunden für ${key}`);
  let fm = text.slice(4, end);
  const line = `${key}: ${yaml(value)}`;
  const re = new RegExp(`^${key}:.*$`, 'm');
  if (re.test(fm)) fm = fm.replace(re, line);
  else fm += `\n${line}`;
  return `---\n${fm}\n---${text.slice(end + 4)}`;
}

function updateBildstatus(text, item) {
  if (!/\n## Bildstatus\n/.test(text)) return text;
  const statement = item.context
    ? `Das neue Seitenbild ist bewusst als **Kontextbild** gekennzeichnet. ${item.note}`
    : `Das neue Seitenbild hat direkten Bezug zum Betrieb. ${item.note}`;
  return text.replace(/\n## Bildstatus\n[\s\S]*$/, `\n## Bildhinweis\n\n${statement}\n`);
}

async function updateContent(item) {
  const file = `src/content/${item.collection}/${item.slug}.md`;
  let text = await readFile(file, 'utf8');
  const imagePath = `images/georgien/${item.folder}/${item.slug}.jpg`;
  const fields = {
    image: imagePath,
    imageAlt: item.alt,
    imageStatus: 'lizenziert',
    imageCredit: item.credit,
    imageSource: item.source,
    imageLicense: item.license,
    imageEdit: item.context
      ? `Kontextbild: auf maximal 1600 px Breite bezogen; ${item.note}`
      : `Auf maximal 1600 px Breite bezogen; ${item.note}`
  };
  for (const [key, value] of Object.entries(fields)) text = setFrontmatterField(text, key, value);
  text = updateBildstatus(text, item);
  await writeFile(file, text, 'utf8');
}

const collectionList = `---
const {items,section,showImage=true,showStatus=true}=Astro.props;
const base=import.meta.env.BASE_URL;
---
<div class="grid">
  {items.map((x:any)=>{
    const image=x.data.image?.includes('georgische-flagge')?'images/platzhalter.png':x.data.image||'images/platzhalter.png';
    const alt=image==='images/platzhalter.png'?\`Platzhalterbild für \${x.data.title}\`:x.data.imageAlt||x.data.title;
    const isContext=x.data.imageEdit?.startsWith('Kontextbild:');
    return <article class="card">
      {showImage&&<img class="card-image" src={\`\${base}\${image}\`} alt={alt} loading="lazy" decoding="async"/>}
      {showImage&&isContext&&<p class="meta"><strong>Kontextbild</strong> · zeigt nicht den Betrieb selbst</p>}
      {showImage&&x.data.imageCredit&&<p class="meta">Bild: <a href={x.data.imageSource} rel="external noopener noreferrer" target="_blank">{x.data.imageCredit}</a>{x.data.imageLicense&&<> · {x.data.imageLicense}</>}</p>}
      {showStatus&&<span class:list={['badge',x.data.status==='fix'&&'fix']}>{x.data.status.replaceAll('-',' ')}</span>}
      <h2><a href={\`\${base}georgien/\${section}/\${x.data.slug}/\`}>{x.data.title}</a></h2>
      <p>{x.data.summary}</p>
      <p class="meta">{x.data.region}</p>
    </article>
  })}
</div>
`;

const hotelDetail = `---
import Base from '../../../layouts/Base.astro';
import DayLinks from '../../../components/DayLinks.astro';
import {getCollection,render} from 'astro:content';
export async function getStaticPaths(){return (await getCollection('unterkuenfte')).map(entry=>({params:{slug:entry.data.slug},props:{entry}}))}
const {entry}=Astro.props;
const {Content}=await render(entry);
const base=import.meta.env.BASE_URL;
const image=entry.data.image?.includes('georgische-flagge')?'images/platzhalter.png':entry.data.image||'images/platzhalter.png';
const alt=image==='images/platzhalter.png'?\`Platzhalterbild für \${entry.data.title}\`:entry.data.imageAlt||entry.data.title;
const isContext=entry.data.imageEdit?.startsWith('Kontextbild:');
---
<Base title={entry.data.title}>
  <div class="wrap">
    <p><a href={\`\${base}georgien/\`}>Georgien</a> / <a href={\`\${base}georgien/hotels/\`}>Hotels & Unterkünfte</a></p>
    <span class="badge">{entry.data.status.replaceAll('-',' ')}</span>
    <h1>{entry.data.title}</h1>
    <p class="meta">{entry.data.region} · Stand {entry.data.updated.toLocaleDateString('de-CH')}</p>
    <img class="item-image" src={\`\${base}\${image}\`} alt={alt} loading="lazy" decoding="async"/>
    {isContext&&<p class="meta"><strong>Kontextbild:</strong> Das Bild zeigt nicht das Hotel selbst.</p>}
    {entry.data.imageCredit&&<p class="meta">Bild: <a href={entry.data.imageSource} rel="external noopener noreferrer" target="_blank">{entry.data.imageCredit}</a>{entry.data.imageLicense&&<> · {entry.data.imageLicense}</>}</p>}
    <p class="lead">{entry.data.summary}</p>
    <article class="prose"><Content /></article>
    <DayLinks days={entry.data.days} />
    <h2>Quellen</h2>
    <ul>{entry.data.sources.map((s:any)=><li><a href={s.url} rel="external noopener noreferrer" target="_blank">{s.label}</a></li>)}</ul>
  </div>
</Base>
`;

const restaurantDetail = `---
import Base from '../../../layouts/Base.astro';
import {getCollection,render} from 'astro:content';
export async function getStaticPaths(){return (await getCollection('restaurants')).map(entry=>({params:{slug:entry.data.slug},props:{entry}}))}
const {entry}=Astro.props;
const {Content}=await render(entry);
const base=import.meta.env.BASE_URL;
const image=entry.data.image||'images/platzhalter.png';
const alt=entry.data.imageAlt||\`Platzhalterbild für \${entry.data.title}\`;
const isContext=entry.data.imageEdit?.startsWith('Kontextbild:');
---
<Base title={entry.data.title}>
  <div class="wrap">
    <p><a href={\`\${base}georgien/\`}>Georgien</a> / <a href={\`\${base}georgien/restaurants/\`}>Restaurants</a></p>
    <span class="badge">{entry.data.status.replaceAll('-',' ')}</span>
    <h1>{entry.data.title}</h1>
    <p class="meta">{entry.data.region} · Stand {entry.data.updated.toLocaleDateString('de-CH')}</p>
    <img class="item-image" src={\`\${base}\${image}\`} alt={alt} loading="lazy" decoding="async"/>
    {isContext&&<p class="meta"><strong>Kontextbild:</strong> Das Bild zeigt nicht den Betrieb selbst.</p>}
    {entry.data.imageCredit&&<p class="meta">Bild: <a href={entry.data.imageSource} rel="external noopener noreferrer" target="_blank">{entry.data.imageCredit}</a>{entry.data.imageLicense&&<> · {entry.data.imageLicense}</>}</p>}
    <p class="lead">{entry.data.summary}</p>
    <article class="prose"><Content /></article>
    {entry.data.days.length>0&&<aside class="alert"><strong>Reisetage:</strong> {entry.data.days.join(', ')}</aside>}
    <h2>Quellen</h2>
    <ul>{entry.data.sources.map((s:any)=><li><a href={s.url} rel="external noopener noreferrer" target="_blank">{s.label}</a></li>)}</ul>
  </div>
</Base>
`;

for (const item of items) {
  const target = `public/images/georgien/${item.folder}/${item.slug}.jpg`;
  console.log(`Lade ${item.slug} ...`);
  await fetchImage(downloadUrl(item.download), target);
  await updateContent(item);
}

await writeFile('src/components/CollectionList.astro', collectionList, 'utf8');
await writeFile('src/pages/georgien/hotels/[slug].astro', hotelDetail, 'utf8');
await writeFile('src/pages/georgien/restaurants/[slug].astro', restaurantDetail, 'utf8');

console.log(`Fertig: ${items.length} Bilder und Content-Einträge aktualisiert.`);
