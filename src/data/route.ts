export type MapPointType = 'place' | 'sight' | 'hotel' | 'restaurant' | 'airport';
export type MapPoint = { name:string; type:MapPointType; lat:number; lon:number; href:string; days:string[] };

// Sonderpunkte ohne eigene Content Collection. Alle redaktionellen POI werden in karte.astro aus Collections erzeugt.
export const specialPoints: MapPoint[] = [
  { name:'Flughafen Batumi', type:'airport', lat:41.6103, lon:41.5997, href:'georgien/fluege/', days:['tag-13'] },
];

// Schematische Etappen: Verbindet Reiseziele zur Orientierung, behauptet ausdrücklich keine Strassengenauigkeit.
export const routeStages: ReadonlyArray<{id:string;label:string;variant:boolean;coordinates:ReadonlyArray<readonly [number,number]>}> = [
  { id:'tbilisi-mtskheta', label:'Tbilisi → Mtskheta / Heerstrasse → Stepantsminda', variant:false, coordinates:[[41.6938,44.8015],[41.8421,44.7215],[42.1639,44.7028],[42.6578,44.6458]] },
  { id:'stepantsminda-gori', label:'Variante Gori', variant:true, coordinates:[[42.6578,44.6458],[41.9668,44.2080],[41.9817,44.1124]] },
  { id:'stepantsminda-kutaisi', label:'Variante Kutaisi', variant:true, coordinates:[[42.6578,44.6458],[41.9668,44.2080],[42.2679,42.6946]] },
  { id:'west', label:'Imeretien → Shekvetili → Batumi → Flughafen', variant:false, coordinates:[[42.2679,42.6946],[41.9219,41.7675],[41.6168,41.6367],[41.6103,41.5997]] },
];

export const routeGeometry = routeStages.flatMap((stage, index) => index ? stage.coordinates.slice(1) : stage.coordinates)
  .map(([lat, lon]) => ({ lat, lon }));
