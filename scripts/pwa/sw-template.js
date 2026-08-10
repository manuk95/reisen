const BUILD='__BUILD_ID__',CACHE=`reisen-${BUILD}`,CACHE_PREFIX='reisen-',BASE='/reisen/';
const CORE=[BASE,BASE+'georgien/',BASE+'georgien/reiseplan/',BASE+'georgien/heute/',BASE+'georgien/wissen/praktisches/',BASE+'georgien/wissen/packliste/',BASE+'georgien/genuss/',BASE+'offline/',BASE+'images/start_image.png',BASE+'images/platzhalter.png',BASE+'manifest.webmanifest'];

self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE))));

self.addEventListener('message',event=>{
  if(event.data?.type==='SKIP_WAITING')self.skipWaiting();
});

self.addEventListener('activate',event=>event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(key=>key.startsWith(CACHE_PREFIX)&&key!==CACHE).map(key=>caches.delete(key)));
  await self.clients.claim();
  const clients=await self.clients.matchAll({type:'window',includeUncontrolled:true});
  clients.forEach(client=>client.postMessage({type:'UPDATE_ACTIVATED',build:BUILD}));
})()));

self.addEventListener('fetch',event=>{
  const url=new URL(event.request.url);
  if(event.request.method!=='GET'||url.hostname==='tile.openstreetmap.org'||url.origin!==location.origin)return;
  if(event.request.mode==='navigate'){
    event.respondWith(fetch(event.request).then(response=>{
      if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(event.request,copy)))}
      return response;
    }).catch(async()=>await caches.match(event.request)||await caches.match(BASE+'offline/')));
    return;
  }
  event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request).then(response=>{
    if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(event.request,copy)))}
    return response;
  })));
});
