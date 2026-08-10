const originalFetch = globalThis.fetch;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let nextRequestAt = 0;

async function pacedFetch(...args) {
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const wait = Math.max(0, nextRequestAt - Date.now());
    if (wait) await sleep(wait);
    nextRequestAt = Date.now() + 2200;

    const response = await originalFetch(...args);
    if (response.status !== 429) return response;

    const retryAfter = Number(response.headers.get('retry-after'));
    const retryMs = Number.isFinite(retryAfter) && retryAfter > 0
      ? retryAfter * 1000
      : Math.min(30000, 5000 * attempt);
    console.warn(`Wikimedia rate limit hit; retry ${attempt}/6 after ${retryMs} ms.`);
    await sleep(retryMs);
  }
  return originalFetch(...args);
}

globalThis.fetch = pacedFetch;
await import('./fetch-selected-business-images.mjs');
