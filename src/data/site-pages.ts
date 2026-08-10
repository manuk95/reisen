export type NavigationItem = { label: string; path: string };

export const mainNavigation: Array<{ label: string; items?: NavigationItem[]; path?: string }> = [
  { label: 'Startseite', path: 'georgien/' },
  { label: 'Reiseplan', items: [
    { label: 'Gesamtroute', path: 'georgien/reiseplan/' },
    { label: 'Flüge & Bahn', path: 'georgien/fluege/' },
    { label: 'Fahrten', path: 'georgien/fahrten/' },
  ] },
  { label: 'Entdecken', items: [
    { label: 'Karte & Route', path: 'georgien/karte/' },
    { label: 'Orte & Regionen', path: 'georgien/orte/' },
    { label: 'Sehenswürdigkeiten', path: 'georgien/sehenswuerdigkeiten/' },
  ] },
  { label: 'Kosten', items: [{ label: 'Kostenübersicht', path: 'georgien/kosten/' }] },
  { label: 'Essen & Trinken', items: [{ label: 'Kulinarik', path: 'georgien/genuss/' }] },
  { label: 'Wissen über Georgien', path: 'georgien/wissen/' },
  { label: 'Suche', path: 'suche/' },
];

export const footerNavigation: Array<{ label: string; items: NavigationItem[] }> = [
  { label: 'Reiseplanung', items: [
    { label: 'Heute', path: 'georgien/heute/' },
    { label: 'Flüge & Bahn', path: 'georgien/fluege/' },
    { label: 'Rechtzeitig buchen', path: 'georgien/rechtzeitig-buchen/' },
    { label: 'Schlechtwetter', path: 'georgien/schlechtwetter/' },
  ] },
  { label: 'Entdecken', items: [
    { label: 'Weinland', path: 'georgien/weinland/' },
    { label: 'UNESCO', path: 'georgien/unesco/' },
    { label: 'Aktivitäten', path: 'georgien/aktivitaeten/' },
  ] },
  { label: 'Unterwegs', items: [
    { label: 'Fahrten', path: 'georgien/fahrten/' },
    { label: 'Restaurants', path: 'georgien/restaurants/' },
    { label: 'Hotels & Unterkünfte', path: 'georgien/hotels/' },
    { label: 'Packliste', path: 'georgien/wissen/packliste/' },
  ] },
  { label: 'Service', items: [{ label: 'Quellen & Bildnachweise', path: 'bildnachweis/' }] },
];

export const mobileNavigation: NavigationItem[] = [
  { label: 'Heute', path: 'georgien/heute/' },
  { label: 'Route', path: 'georgien/reiseplan/' },
  { label: 'Karte', path: 'georgien/karte/' },
  { label: 'Entdecken', path: 'georgien/sehenswuerdigkeiten/' },
  { label: 'Suche', path: 'suche/' },
];
