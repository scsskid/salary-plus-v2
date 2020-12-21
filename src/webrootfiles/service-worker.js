const version = 3;
const currentCacheName = `salary-plus-assets-${version}`;
const filesToCache = [
  '/',
  '/main.js',
  '/main.css',
  '/icons/',
  '/view/dashboard/',
  '/icons/icon-add.svg',
  '/icons/icon-settings.svg',
  '/icons/icon-view.svg',
  '/icons/app-icons/app-icon-180.png'
];

self.addEventListener('install', (event) => {
  console.log(`[ServiceWorker] Install with Cache Key:${currentCacheName}`);

  event.waitUntil(
    caches
      .open(currentCacheName)
      .then((cache) => cache.addAll(filesToCache))
      .then(function () {
        console.log('[ServiceWorker] Install completed !');
      })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        // Delete any caches that arent that new worker doesn't need
        cacheNames.map((cacheName) => {
          if (cacheName !== currentCacheName) {
            console.log(`[SW] Deleting old cache`, cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  console.log('[ServiceWorker] fetch event');

  event.respondWith(
    caches.open(currentCacheName).then((cache) => {
      // If fetched resource not found in cache,
      // try to fetch it from network and put it in cache
      return cache.match(event.request).then((response) => {
        const fetchPromise = fetch(event.request).then(function (
          networkResponse
        ) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        return response || fetchPromise;
      });
    })
  );
});
