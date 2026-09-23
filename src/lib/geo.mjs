const EARTH_KM = 6371;
const rad = (value) => value * Math.PI / 180;

export function distanceKm(a, b) {
  const dLat = rad(b.lat - a.lat), dLon = rad(b.lon - a.lon);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_KM * Math.asin(Math.sqrt(h));
}

function local(point, origin) {
  return { x: rad(point.lon - origin.lon) * EARTH_KM * Math.cos(rad(origin.lat)), y: rad(point.lat - origin.lat) * EARTH_KM };
}

export function pointToSegmentKm(point, start, end) {
  const p = local(point, start), b = local(end, start);
  const length2 = b.x ** 2 + b.y ** 2;
  if (!length2) return distanceKm(point, start);
  const t = Math.max(0, Math.min(1, (p.x * b.x + p.y * b.y) / length2));
  return Math.hypot(p.x - t * b.x, p.y - t * b.y);
}

export function pointToRouteKm(point, route) {
  if (!route.length) return Infinity;
  if (route.length === 1) return distanceKm(point, route[0]);
  return Math.min(...route.slice(1).map((end, i) => pointToSegmentKm(point, route[i], end)));
}

export function nearbyPoints(points, reference, radiusKm) {
  if (!reference) return [];
  return points.map((point) => ({ ...point, distance: distanceKm(reference, point) }))
    .filter((point) => point.distance <= radiusKm).sort((a, b) => a.distance - b.distance);
}

export function pointsAlongRoute(points, route, corridorKm = 10) {
  return points.map((point) => ({ ...point, distance: pointToRouteKm(point, route) }))
    .filter((point) => point.distance <= corridorKm).sort((a, b) => a.distance - b.distance);
}
