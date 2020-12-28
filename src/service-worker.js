import { NavigationRoute, registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';
import { createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching';

registerRoute(new RegExp('/(.*)'), new StaleWhileRevalidate());
precacheAndRoute(self.__WB_MANIFEST);

const handler = createHandlerBoundToURL('/index.html');
const navigationRoute = new NavigationRoute(handler);
registerRoute(navigationRoute);
