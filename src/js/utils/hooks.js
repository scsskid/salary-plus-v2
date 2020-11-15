import * as React from 'react';
import pages from '../../data/pages';
import { useLocation } from 'react-router-dom';

function useClock() {
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

function useSegments() {
  const { pathname } = useLocation();

  const page = pages.find((page) => {
    console.log(page);
    return page?.segments?.find((segment) => segment.url === pathname);
  });

  return page.segments;
}
function usePage() {
  // const { pathname } = useLocation();
  // return pages.find((page) => {
  //   return '/' + page.id === pathname;
  // });
}

export { useClock, useSegments, usePage };
