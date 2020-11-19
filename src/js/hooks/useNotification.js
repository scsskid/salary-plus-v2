import * as React from 'react';

import useDelayedUnmounting from '../hooks/useDelayedUnmounting';

export default function useNotification(initialState) {
  const [notification, setNotification] = React.useState(initialState);
  const [mountingState, show, hide] = useDelayedUnmounting(1000);
  let timeOutId;
  React.useEffect(() => {
    // console.log('hook effect', notification);
    if (notification) {
      show();
      timeOutId = setTimeout(() => {
        hide();
      }, 3000);
    }

    const clearNotification = setTimeout(() => {
      setNotification(undefined);
    }, 6000);

    return () => {
      clearTimeout(clearNotification);
      clearTimeout(timeOutId);
    };
  }, [notification]);

  return [notification, setNotification, mountingState];
}
