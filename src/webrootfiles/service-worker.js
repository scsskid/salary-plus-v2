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

  // don't wait
  // self.skipWaiting();

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
  console.log('[ServiceWorker] Install');

  // delete any caches that arent
  // return self.clients.claim(); // try to immediately invoke service worker on first load
});

self.addEventListener('fetch', (event) => {
  console.log('[ServiceWorker] fetch event', event);

  event.respondWith(
    caches.match(event.request).then(function (response) {
      // response aka cahce(d)
      // Cache hit - return response
      console.log(response);
      if (response) {
        return response;
      }
      return fetch(event.request).then(function (response) {
        // skip if isnt valid message
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        var responseToCache = response.clone();

        caches.open(cacheName).then(function (cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
