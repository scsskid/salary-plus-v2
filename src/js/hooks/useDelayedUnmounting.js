import * as React from 'react';

export default function useDelayedUnmounting(time = 2000) {
  const [mountingState, setMountingState] = React.useState('unmounted');

  function show() {
    if (mountingState === 'unmounting') {
      return;
    }
    setMountingState('mounting');
  }

  function hide() {
    if (mountingState === 'mounting') {
      return;
    }
    setMountingState('unmounting');
  }

  React.useEffect(() => {
    let timeoutId;
    if (mountingState === 'unmounting') {
      timeoutId = setTimeout(() => {
        setMountingState('unmounted');
      }, time);
    } else if (mountingState === 'mounting') {
      timeoutId = setTimeout(() => {
        setMountingState('mounted');
      }, 0);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [mountingState, time]);

  return [mountingState, show, hide];
}
