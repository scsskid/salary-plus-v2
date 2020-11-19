import * as React from 'react';

export default function useNotification(initialState = {}) {
  const [notification, setNotification] = React.useState(initialState);

  // React.useEffect(() => {
  //   const clearNotification = setTimeout(() => {
  //     setNotification({});
  //   }, 30000);

  //   return () => {
  //     clearTimeout(clearNotification);
  //   };
  // }, [notification]);

  return [notification, setNotification];
}
