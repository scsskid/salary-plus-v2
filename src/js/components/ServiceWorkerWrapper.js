import * as React from 'react';
import { Workbox, messageSW } from 'workbox-window';

export default function ServiceWorkerWrapper() {
  const [showPrompt, setShowPrompt] = React.useState(false);
  const wb = new Workbox('/service-worker.js');
  let registration;

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
      console.log('message to wait ing sw');
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
      <div className="update-avaiable-notification">
        <h1>New version available</h1>
        <p>
          <button className="btn" onClick={onAccept}>
            Install
          </button>{' '}
          <button className="btn" onClick={onReject}>
            Not now
          </button>
        </p>
      </div>
    )
  );
}
