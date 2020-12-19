const version = 2;
const currentCacheName = `salary-plus-assets-${version}`;
const filesToCache = [
  '/',
  '/main.js',
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
        cacheNames.map((cacheName) => {
          if (cacheName !== currentCacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// If fetched resource not found in cache, try to fetch it from network and put it in cache

self.addEventListener('fetch', (event) => {
  console.log('[ServiceWorker] fetch event', event);

  event.respondWith(
    caches.match(event.request).then(function (response) {
      return (
        response ||
        fetch(event.request)
          .then(function (response) {
            // skip if isnt valid message
            if (
              !response ||
              response.status !== 200 ||
              response.type !== 'basic'
            ) {
              return response;
            }

            let responseClone = response.clone();

            caches.open(currentCacheName).then(function (cache) {
              cache.put(event.request, responseClone);
            });

            return response;
          })
          .catch(() => {
            return new Response(
              '<p>Could not get Request from Cache or from Network</p>',
              {
                headers: { 'Content-Type': 'text/html' }
              }
            );
          })
      );
    })
  );
});

// similar functionality /w async/await syntax

/*

addEventListener('fetch', event => {
  // Prevent the default, and handle the request ourselves.
  event.respondWith(async function() {
    // Try to get the response from a cache.
    const cachedResponse = await caches.match(event.request);
    // Return it if we found one.
    if (cachedResponse) return cachedResponse;
    // If we didn't find a match in the cache, use the network.
    return fetch(event.request);
  }());
});

*/
