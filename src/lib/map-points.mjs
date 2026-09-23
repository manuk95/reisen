export function collectionMapPoints(entries, type, section) {
  return entries.filter((entry) => entry.coordinates).map((entry) => ({ name:entry.title, type, lat:entry.coordinates.lat, lon:entry.coordinates.lon, href:`georgien/${section}/${entry.slug}/`, days:entry.days }));
}
