import { NavigationRoute, registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';
import { createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching';
import { BroadcastUpdatePlugin } from 'workbox-broadcast-update';
import { setCacheNameDetails } from 'workbox-core';

setCacheNameDetails({
  prefix: 'salary-plus'
});

registerRoute(
  new RegExp('/(.*)'),
  new StaleWhileRevalidate({
    plugins: [new BroadcastUpdatePlugin()]
  })
);

precacheAndRoute(self.__WB_MANIFEST, {});

addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('skip waiting triggered');
    self.skipWaiting();
  }
});

// const handler = createHandlerBoundToURL('/index.html');
// const navigationRoute = new NavigationRoute(handler);
// registerRoute(navigationRoute);
