import * as React from 'react';
import { Workbox, messageSW } from 'workbox-window';

export default function ServiceWorkerWrapper() {
  const [showPrompt, setShowPrompt] = React.useState(false);

  const wb = new Workbox('/service-worker.js');

  let registration = 'foo';

  function onReject() {
    setShowPrompt(false);
  }

  async function onAccept() {
    console.log('On Accept', registration);
    wb.addEventListener('controlling', () => {
      console.log('controller change');
      window.location.reload();
    });

    if (registration && registration.waiting) {
      console.log('message to waiting sw');
      messageSW(registration.waiting, { type: 'SKIP_WAITING' });
    }
  }

  React.useEffect(() => {
    wb.addEventListener('waiting', () => {
      setShowPrompt(true);
    });
    wb.addEventListener('externalwaiting', () => {
      setShowPrompt(true);
    });
  }, []);

  wb.register().then((r) => {
    registration = r;
  });

  return (
    showPrompt && (
      <div>
        <h1>New version available</h1>
        <p>
          <button onClick={onAccept}>Install</button>{' '}
          <button onClick={onReject}>Not now</button>
        </p>
      </div>
    )
  );
}
