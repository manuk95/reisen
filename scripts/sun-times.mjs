/**
 * Reproduzierbare Sonnenzeiten nach dem NOAA-Algorithmus.
 * Ortszeit wird über den in der Reise verwendeten UTC-Offset ausgegeben:
 * Georgien UTC+4, Zürich am 11. Oktober 2026 UTC+2 (CEST).
 * Gegenprobe: https://www.timeanddate.com/sun/
 */
const rad = Math.PI / 180;
const deg = 180 / Math.PI;
const norm = (value) => ((value % 360) + 360) % 360;

function eventUtc(date, lat, lon, sunrise) {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const day = Math.floor((date - start) / 86400000);
  const lngHour = lon / 15;
  const t = day + ((sunrise ? 6 : 18) - lngHour) / 24;
  const m = 0.9856 * t - 3.289;
  let l = m + 1.916 * Math.sin(m * rad) + 0.02 * Math.sin(2 * m * rad) + 282.634;
  l = norm(l);
  let ra = deg * Math.atan(0.91764 * Math.tan(l * rad));
  ra = norm(ra);
  const lQuadrant = Math.floor(l / 90) * 90;
  const raQuadrant = Math.floor(ra / 90) * 90;
  ra = (ra + lQuadrant - raQuadrant) / 15;
  const sinDec = 0.39782 * Math.sin(l * rad);
  const cosDec = Math.cos(Math.asin(sinDec));
  const cosH = (Math.cos(90.833 * rad) - sinDec * Math.sin(lat * rad)) / (cosDec * Math.cos(lat * rad));
  const h = (sunrise ? 360 - deg * Math.acos(cosH) : deg * Math.acos(cosH)) / 15;
  return h + ra - 0.06571 * t - 6.622 - lngHour;
}

export function sunTimes(date, lat, lon, utcOffset) {
  const format = (hours) => {
    const minutes = Math.round((((hours + utcOffset) % 24) + 24) % 24 * 60);
    return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
  };
  return { sunrise: format(eventUtc(date, lat, lon, true)), sunset: format(eventUtc(date, lat, lon, false)) };
}

if (process.argv[1].endsWith('sun-times.mjs')) {
  const [date, lat, lon, offset] = process.argv.slice(2);
  if (!offset) throw new Error('Verwendung: node scripts/sun-times.mjs YYYY-MM-DD lat lon utcOffset');
  console.log(JSON.stringify(sunTimes(new Date(`${date}T00:00:00Z`), Number(lat), Number(lon), Number(offset))));
}
