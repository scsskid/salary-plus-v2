const version = 1;
const cacheName = `assets-${version}`;
const filesToCache = [
  '/',
  '/main.js',
  '/icons/',
  '/view/dashboard/',
  '/icons/icon-add.svg'
];

self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(filesToCache);
      })
      .then(function () {
        console.log('[ServiceWorker] Install completed !');
      })
  );
});

self.addEventListener('activate', function (event) {
  console.log('Claiming control');
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  console.log('sw fetch event 2');
  console.log(event);

  // event.respondWith(async function() {
  //   const cache = await caches.open(cacheName)
  // })

  // always return cache:

  event.respondWith(
    caches.match(event.request).then(function (cached) {
      console.log(cached);
      return cached;
    })
  );
});
