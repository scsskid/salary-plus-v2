const version = 1;
const assetCacheName = `assets-${version}`;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(assetCacheName)
      .then((cache) => {
        return cache.addAll([
          '/',
          '/main.js',
          '/icons/',
          '/icons/icon-add.svg'
        ]);
      })
      .then(function () {
        console.log('WORKER: install completed !');
      })
  );
});

self.addEventListener('fetch', (event) => {
  console.log('sw fetch event 2');

  event.respondWith(
    caches.match(event.request).then(function (cached) {
      console.log(cached);
      return cached;
    })
  );
});
