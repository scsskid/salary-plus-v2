import * as React from 'react';

export default function useDelayedUnmounting(time = 2000) {
  const [state, setState] = React.useState('unmounted');

  function show() {
    if (state === 'unmounting') {
      return;
    }
    setState('mounting');
  }

  function hide() {
    if (state === 'mounting') {
      return;
    }
    setState('unmounting');
  }

  React.useEffect(() => {
    let timeoutId;
    if (state === 'unmounting') {
      timeoutId = setTimeout(() => {
        setState('unmounted');
      }, time);
    } else if (state === 'mounting') {
      // timeoutId = setTimeout(() => {}, time);
      setState('mounted');
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [state, time]);

  return [state, show, hide];
}
