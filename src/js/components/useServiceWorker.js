import * as React from 'react';
import { Workbox, messageSW } from 'workbox-window';

export default function useServiceWorker({ appendToast }) {
  const wb = new Workbox('/service-worker.js');
  let registration;

  async function onAccept() {
    console.log('On Accept', registration);
    wb.addEventListener('controlling', () => {
      console.log('[wb] controller change');
      appendToast({ message: 'Updating...' });
      window.location.reload();
    });

    if (registration && registration.waiting) {
      console.log('message to wait ing sw');
      messageSW(registration.waiting, { type: 'SKIP_WAITING' });
    }
  }

  function activatePrompt() {
    appendToast({
      message: 'New version available.',
      persistent: true,
      confirm: {
        buttonLabel: 'Update',
        action: onAccept
      }
    });
  }

  React.useEffect(() => {
    wb.addEventListener('waiting', activatePrompt);
    wb.addEventListener('externalwaiting', activatePrompt);
    wb.addEventListener('activated', (event) => {
      // appendToast({ message: '******* WB Activated.', persistent: true });
    });
    wb.addEventListener('installed', (event) => {
      const { isUpdate } = event;
      const message = isUpdate
        ? 'Update Installed. Ready to apply.'
        : 'The App is now installed and works offline.';
      appendToast({ message });
      console.log('WB installed', event);
    });
  }, []);

  wb.register().then((r) => {
    registration = r;
  });

  return wb;
}
