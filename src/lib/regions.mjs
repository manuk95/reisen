export const REGION_META = [
  ['tbilisi', 'Tbilisi'], ['mtskheta-mtianeti', 'Mtskheta-Mtianeti'],
  ['shida-kartli', 'Shida Kartli'], ['kvemo-kartli', 'Kvemo Kartli'],
  ['kakheti', 'Kachetien'], ['imereti', 'Imeretien'], ['guria', 'Gurien'],
  ['adjara', 'Adscharien'], ['samegrelo-zemo-svaneti', 'Samegrelo-Zemo Swanetien'],
  ['racha-lechkhumi-kvemo-svaneti', 'Ratscha-Letschchumi und Niederswanetien'],
  ['samtskhe-javakheti', 'Samtskhe-Dschawachetien'], ['abkhazia', 'Abchasien'],
].map(([id, label]) => ({ id, label }));

const aliases = new Map([
  ['tbilisi','tbilisi'], ['mtskheta','mtskheta-mtianeti'], ['mtskheta-mtianeti','mtskheta-mtianeti'],
  ['mzcheta-mtianeti','mtskheta-mtianeti'], ['stepantsminda','mtskheta-mtianeti'],
  ['kazbegi / stepantsminda','mtskheta-mtianeti'], ['stepantsminda / mzcheta-mtianeti','mtskheta-mtianeti'],
  ['shida kartli','shida-kartli'], ['gori','shida-kartli'], ['kvemo kartli','kvemo-kartli'],
  ['kachetien','kakheti'], ['kakheti','kakheti'], ['imeretien','imereti'], ['kutaisi','imereti'],
  ['gurien','guria'], ['ureki / gurien','guria'], ['shekvetili','guria'],
  ['adscharien','adjara'], ['batumi','adjara'], ['kobuleti / adscharien','adjara'],
  ['samegrelo und swanetien','samegrelo-zemo-svaneti'], ['samegrelo-zemo swanetien','samegrelo-zemo-svaneti'],
  ['ratscha','racha-lechkhumi-kvemo-svaneti'], ['samtskhe-dschawachetien','samtskhe-javakheti'],
  ['abchasien','abkhazia'], ['tbilisi / mtatsminda','tbilisi'], ['tbilisi / vera','tbilisi'],
  ['tbilisi / heerstrasse','tbilisi'],
  ['kartli / ratscha','racha-lechkhumi-kvemo-svaneti'], ['samegrelo / westgeorgien','samegrelo-zemo-svaneti'],
  ['samegrelo','samegrelo-zemo-svaneti'], ['tsikhisdziri / adscharien','adjara'],
  ['westgeorgien / adscharien','adjara'], ['westgeorgien','imereti'], ['georgien','tbilisi'],
]);

export function normalizeRegion(value) {
  const key = String(value ?? '').trim().toLocaleLowerCase('de-CH');
  return aliases.get(key);
}

export function requireRegion(value) {
  const region = normalizeRegion(value);
  if (!region) throw new Error(`Unbekannter Regionswert: ${value}`);
  return region;
}

export function deriveRegionStatus(regionId, places, sights) {
  if (places.some((item) => requireRegion(item.region) === regionId && item.days.length > 0 && item.status !== 'nicht-auf-route')) return 'visited';
  if (sights.some((item) => requireRegion(item.region) === regionId && item.days.length > 0 && item.status !== 'nicht-auf-route')) return 'optional';
  return 'off-route';
}

export function isRoutePlace(item) {
  return item.days.length > 0 && item.status !== 'nicht-auf-route' && Boolean(item.coordinates);
}
