import { requireRegion } from './regions.mjs';

export function relatedForPlace(place, collections) {
  const sameTrip = (item) => item.trip === place.trip;
  const overlaps = (item) => item.days.some((day) => place.days.includes(day));
  const related = (item) => item.related.includes(place.slug) || place.related.includes(item.slug);
  return {
    sights: collections.sights.filter((item) => sameTrip(item) && (related(item) || overlaps(item) || requireRegion(item.region) === requireRegion(place.region))),
    restaurants: collections.restaurants.filter((item) => sameTrip(item) && (related(item) || overlaps(item))),
    hotels: collections.hotels.filter((item) => sameTrip(item) && (related(item) || overlaps(item))),
    days: collections.days.filter((item) => item.trip === place.trip && place.days.includes(item.slug)),
  };
}

export function entriesForRegion(regionId, entries) {
  return entries.filter((item) => requireRegion(item.region) === regionId)
    .sort((a, b) => Number(b.days.length > 0) - Number(a.days.length > 0) || a.title.localeCompare(b.title, 'de'));
}
