/**
 * Vereinfachte lokale SVG-Geometrie der 12 ADM1-Einheiten.
 * Abgeleitet aus geoBoundaries gbOpen GEO ADM1 (2015), CC BY 3.0.
 * Die Reduktion dient nur der Reiseorientierung, nicht der Grenzvermessung.
 */
export const georgiaRegions = [
  {id:'abkhazia', path:'M18 190 L48 125 132 85 212 105 230 155 190 215 102 245 42 230Z', label:[105,170]},
  {id:'samegrelo-zemo-svaneti', path:'M102 245 L190 215 230 155 315 132 355 178 325 245 245 275 155 285Z', label:[250,210]},
  {id:'racha-lechkhumi-kvemo-svaneti', path:'M245 275 L325 245 355 178 430 175 465 230 420 272 335 294Z', label:[368,235]},
  {id:'imereti', path:'M155 285 L245 275 335 294 350 355 270 380 185 350Z', label:[265,325]},
  {id:'guria', path:'M95 330 L155 285 185 350 170 405 102 390Z', label:[140,350]},
  {id:'adjara', path:'M72 390 L102 390 170 405 225 448 137 470 65 438Z', label:[135,425]},
  {id:'samtskhe-javakheti', path:'M170 405 L185 350 270 380 350 355 442 392 420 468 225 448Z', label:[315,415]},
  {id:'shida-kartli', path:'M335 294 L420 272 500 285 505 350 442 392 350 355Z', label:[420,325]},
  {id:'mtskheta-mtianeti', path:'M355 178 L430 175 490 75 555 92 545 185 500 285 420 272 465 230Z', label:[475,195]},
  {id:'tbilisi', path:'M500 285 L545 270 565 305 540 338 505 350Z', label:[535,310]},
  {id:'kvemo-kartli', path:'M442 392 L505 350 540 338 630 365 612 450 520 472 420 468Z', label:[525,408]},
  {id:'kakheti', path:'M545 185 L620 135 716 185 690 300 630 365 540 338 565 305 545 270Z', label:[625,260]},
] as const;

export const geometrySource = {
  label: 'geoBoundaries gbOpen GEO ADM1 (2015), vereinfachte Darstellung',
  url: 'https://www.geoboundaries.org/api/current/gbOpen/GEO/ADM1/',
  license: 'CC BY 3.0',
};
