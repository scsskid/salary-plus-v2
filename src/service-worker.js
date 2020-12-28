import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';
import { precacheAndRoute } from 'workbox-precaching';

registerRoute(new RegExp('/(.*)'), new StaleWhileRevalidate());
precacheAndRoute(self.__WB_MANIFEST);
