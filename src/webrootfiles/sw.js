self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('cache-test').then((cache) => {
      return cache.addAll(['/', '/icons/', '/icons/icon-add.svg']);
    })
  );
});
