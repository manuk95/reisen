import { access, mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

const media = [
  ['public/images/georgien/genuss/ajapsandali.jpg', 'Adjapsandali of Georgian Cuisine.jpg'],
  ['public/images/georgien/genuss/ajika.jpg', 'Ajika made with walnuts and red peppers.jpg'],
  ['public/images/georgien/genuss/badrijani-nigvzit.jpg', 'Badrijani (cropped).jpg'],
  ['public/images/georgien/genuss/borano.jpg', 'Discs-of-sulguni-cheese.jpg'],
  ['public/images/georgien/genuss/churchkhela.jpg', 'Kakheti, Georgia — Churchkhela.jpg'],
  ['public/images/georgien/genuss/gebzhalia.jpg', 'Gebzhalia with matsoni.jpg'],
  ['public/images/georgien/genuss/ghomi.jpg', 'Ghomi with Georgian Cheese Sulguni.jpg'],
  ['public/images/georgien/genuss/jonjoli.jpg', 'Jonjoli bladdernut flower pickles.jpg'],
  ['public/images/georgien/genuss/lobiani.jpg', 'Lobiani - bean-filled bread.jpg'],
  ['public/images/georgien/genuss/mchadi-chvishtari.jpg', 'Mchadi 2.jpg'],
  ['public/images/georgien/genuss/megrelian-kharcho.jpg', 'Kharcho meat soup.jpg'],
  ['public/images/georgien/genuss/satsivi.jpg', 'Satsivi (2).jpg'],
  ['public/images/georgien/genuss/shkmeruli.jpg', 'Shkmeruli.jpg'],
  ['public/images/georgien/genuss/sulguni.jpg', 'Discs-of-sulguni-cheese.jpg'],
  ['public/images/georgien/genuss/tkemali.jpg', 'Tkemali.JPG'],
  ['public/images/georgien/sehenswuerdigkeiten/freedom-square-bankraub-1907.jpg', 'Yerevan Square, Tbilisi.jpg'],
  ['public/images/georgien/sehenswuerdigkeiten/museum-of-illusions-tbilisi.jpg', 'Betlemi neighborhood in Old Tbilisi.jpg'],
  ['public/images/georgien/sehenswuerdigkeiten/narikala-zipline.jpg', 'Tbilisi aerial tramway Rike-Narikala.JPG'],
  ['public/images/georgien/sehenswuerdigkeiten/shekvetili-dendrological-park.jpg', 'Shekvetili Park.jpg'],
  ['public/images/georgien/sehenswuerdigkeiten/tbilisi-digital-space.jpg', 'National Gallery, Rustaveli Avenue, Tbilisi, Georgia.jpg'],
  ['public/images/georgien/sehenswuerdigkeiten/gergeti-slider-1.jpg', 'Gergeti Trinity Church.jpg'],
  ['public/images/georgien/sehenswuerdigkeiten/gergeti-slider-2.jpg', 'Khevi, Georgia — Gergeti Trinity Church.jpg'],
  ['public/images/georgien/sehenswuerdigkeiten/leghvtakhevi.jpg', 'Leghvtakhevi.jpg'],
  ['public/images/georgien/sehenswuerdigkeiten/friedensbruecke-rike-park.jpg', 'Tbilisi Peace Bridge and Rike Park.jpg'],
  ['public/images/georgien/sehenswuerdigkeiten/sno-festung.jpg', 'Sno Fortress, Snostskali Valley, Khevi, Georgia.jpg'],
  ['public/images/georgien/sehenswuerdigkeiten/kutaisi-zentrum.jpg', '2025-06-21 Colchis Fountain, Kutaisi.jpg'],
  ['public/images/georgien/sehenswuerdigkeiten/kolkheti-nationalpark.jpg', 'Lake Paliastomi.jpg'],
  ['public/images/georgien/sehenswuerdigkeiten/batumi-altstadt.jpg', 'Batumi - Piazza.jpg'],
  ['public/images/georgien/sehenswuerdigkeiten/batumi-boulevard-miracle-park.jpg', 'Batumi2025-ali-and-nino.jpg'],
  ['public/images/georgien/sehenswuerdigkeiten/petra-festung.jpg', 'Petra Fortress, Tsikhisdziri, Georgia.jpg'],
  ['public/images/georgien/sehenswuerdigkeiten/musicians-park.jpg', 'Musicians park near BSA.jpg'],
  ['public/images/georgien/sehenswuerdigkeiten/miniature-park.jpg', 'Shekvetili Park Mukhrani palace Gruzia 2019 14.jpg'],
  ['public/images/georgien/orte/gori.jpg', 'Panoramic View from Gori Fortress.jpg'],
];

async function exists(path) {
  try { await access(path); return true; } catch { return false; }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchImage(file) {
  const url = `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}?width=1600`;
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const response = await fetch(url, {
      redirect: 'follow',
      headers: { 'User-Agent': 'reisen-site-media-fetch/1.0 (GitHub Pages build; personal travel guide)' },
    });
    if (response.ok) return response;
    if (![429, 502, 503, 504].includes(response.status) || attempt === 5) {
      throw new Error(`Bildabruf fehlgeschlagen: ${file} (${response.status})`);
    }
    const retryAfter = Number(response.headers.get('retry-after'));
    const wait = Number.isFinite(retryAfter) && retryAfter > 0
      ? retryAfter * 1000
      : 2000 * (attempt + 1);
    console.warn(`Wikimedia antwortet mit ${response.status}; neuer Versuch für ${file} in ${wait} ms.`);
    await sleep(wait);
  }
  throw new Error(`Bildabruf fehlgeschlagen: ${file}`);
}

for (const [target, file] of media) {
  if (await exists(target)) continue;
  await mkdir(dirname(target), { recursive: true });
  const response = await fetchImage(file);
  const type = response.headers.get('content-type') ?? '';
  if (!type.startsWith('image/')) throw new Error(`Unerwarteter Inhalt für ${file}: ${type}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  await writeFile(target, bytes);
  console.log(`Bild geladen: ${target}`);
  await sleep(1200);
}
