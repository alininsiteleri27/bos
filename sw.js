const CACHE_NAME="11a-panel-v2"; // v1 → v2

const FILES_TO_CACHE=[
  "/",
  "/index.html",
  "/style.css",
  "/manifest.json"
];

self.addEventListener("install",e=>{
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache=>cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate",e=>{
  e.waitUntil(
    caches.keys().then(keys=>
      Promise.all(keys.map(k=>k!==CACHE_NAME&&caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch",e=>{
  e.respondWith(
    caches.match(e.request).then(r=>r||fetch(e.request))
  );
});
