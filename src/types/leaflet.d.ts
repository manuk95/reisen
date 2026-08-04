declare module 'leaflet' {
  export type LatLngExpression = [number, number];

  export interface Layer {
    addTo(target: Map | LayerGroup): this;
  }

  export interface Map {
    fitBounds(bounds: unknown, options?: { padding?: [number, number] }): this;
    setView(center: LatLngExpression, zoom: number): this;
  }

  export interface LayerGroup extends Layer {
    clearLayers(): this;
  }

  export interface Polyline extends Layer {
    getBounds(): unknown;
  }

  export interface CircleMarker extends Layer {
    bindPopup(content: string): this;
  }

  export function map(id: string, options?: { scrollWheelZoom?: boolean }): Map;
  export function tileLayer(url: string, options?: { attribution?: string; maxZoom?: number }): Layer;
  export function layerGroup(): LayerGroup;
  export function polyline(points: LatLngExpression[], options?: { color?: string; weight?: number }): Polyline;
  export function circleMarker(point: LatLngExpression, options?: { radius?: number; color?: string; weight?: number; fillColor?: string; fillOpacity?: number }): CircleMarker;

  const L: {
    map: typeof map;
    tileLayer: typeof tileLayer;
    layerGroup: typeof layerGroup;
    polyline: typeof polyline;
    circleMarker: typeof circleMarker;
  };

  export default L;
}
