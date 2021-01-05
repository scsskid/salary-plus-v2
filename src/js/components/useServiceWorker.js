import * as React from 'react';
import { Workbox, messageSW } from 'workbox-window';

export default function useServiceWorker({ appendToast }) {
  const wb = new Workbox('/service-worker.js');
  let registration;

  async function onAccept() {
    console.log('On Accept', registration);
    wb.addEventListener('controlling', () => {
      console.log('controller change');
      window.location.reload();
    });

    if (registration && registration.waiting) {
      console.log('message to wait ing sw');
      messageSW(registration.waiting, { type: 'SKIP_WAITING' });
    }
  }

  function activatePrompt() {
    appendToast({
      message: 'New version available!!!!',
      persistent: true,
      confirm: {
        buttonLabel: 'install',
        action: onAccept
      }
    });
  }

  React.useEffect(() => {
    wb.addEventListener('waiting', activatePrompt);
    wb.addEventListener('externalwaiting', activatePrompt);
  }, []);

  wb.register().then((r) => {
    registration = r;
  });

  return wb;
}
