const version = 1;
const currentCacheName = `assets-${version}`;
const filesToCache = [
  '/',
  '/main.js',
  '/icons/',
  '/view/dashboard/',
  '/icons/icon-add.svg'
];

self.addEventListener('install', (event) => {
  console.log(`[ServiceWorker] Install with Cache Key:${currentCacheName}`);

  event.waitUntil(
    caches
      .open(currentCacheName)
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
  console.log('[ServiceWorker] Activate');

  // Delete any caches that arent that new worker doesn't need
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.mao((cacheName) => {
          if (cacheName !== currentCacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

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
