import * as React from 'react';
import ReactDOM from 'react-dom';
import '../css/index.css';
import App from './components/App';

ReactDOM.render(<App />, document.getElementById('root'));

if ('serviceWorker' in navigator) {
  window.addEventListener('load', registerServiceWorker);
}

async function registerServiceWorker() {
  const registration = await navigator.serviceWorker.register(
    '/service-worker.js',
    { scope: '/' }
  );

  // ensure the case when the updatefound event was missed is also handled
  // by re-invoking the prompt when there's a waiting Service Worker
  if (registration.waiting) {
    // console.log('sw waiting, invoke sw update flow');
    invokeServiceWorkerUpdateFlow(registration);
  }

  registration.addEventListener('updatefound', () => {
    if (registration.installing) {
      registration.installing.addEventListener('statechange', () => {
        if (registration.waiting) {
          // if there's an existing controller (previous Service Worker), show the prompt
          if (navigator.serviceWorker.controller) {
            // console.log('updatefound, sw waiting, invoke sw update flow');
            invokeServiceWorkerUpdateFlow(registration);
          } else {
            // console.log('Service Worker initialized for the first time');
          }
        }
      });
    }
  });

  let refreshing = false;

  // refresh on controller change
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing) {
      window.location.reload();
      refreshing = true;
    }
  });
}

function invokeServiceWorkerUpdateFlow(registration) {
  showUpdateNotification();
  const updateButton = document.getElementById('updateButton');
  updateButton.addEventListener('click', () => {
    if (registration.waiting) {
      // let waiting Service Worker know it should become active
      registration.waiting.postMessage('SKIP_WAITING');
    }
  });
}

// showUpdateNotification();

function showUpdateNotification() {
  const updateNotification = document.createElement('div');
  const updateButton = document.createElement('button');
  updateButton.classList.add('btn');
  updateButton.id = `updateButton`;
  updateButton.innerText = `Reload to install`;
  updateNotification.innerHTML = `<p>Update Available.</p>`;
  updateNotification.classList.add('update-notification');
  updateNotification.querySelector('p').appendChild(updateButton);
  document.body.appendChild(updateNotification);
}
