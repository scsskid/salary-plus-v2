import * as React from 'react';

export default function useClock() {
  const [clock, setClock] = React.useState(buildClockObj());

  React.useEffect(() => {
    const clockInterval = setInterval(() => {
      // check if is new Hour

      setClock(buildClockObj());
    }, 1000 * 60);

    return () => {
      clearInterval(clockInterval);
    };
  }, [clock]);

  return clock;
}

function buildClockObj() {
  const now = new Date();
  const today = new Date(now.getTime());
  today.setHours(0, 0, 0, 0);

  return {
    now: new Date(),
    today
  };
}
