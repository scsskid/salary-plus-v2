import * as React from 'react';
import ReactDOM from 'react-dom';
import '../css/index.css';
import App from './components/App';

ReactDOM.render(<App />, document.getElementById('root'));

window.addEventListener('load', registerServiceWorker);

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    console.log('CLIENT: service worker registration in progress.');
    navigator.serviceWorker.register('/service-worker.js', { scope: '/' }).then(
      function (registration) {
        console.log(
          'ServiceWorker registration successful with scope: ',
          registration.scope
        );
        // console.log(registration);
        if (registration.installing) {
          console.log('Service worker installing');
        } else if (registration.waiting) {
          console.log('Service worker installed');
        } else if (registration.active) {
          console.log('Service worker active !');
        }
      },
      function () {
        console.log('CLIENT: service worker registration failure.');
      }
    );
  } else {
    console.log('CLIENT: service worker is not supported.');
  }
}
