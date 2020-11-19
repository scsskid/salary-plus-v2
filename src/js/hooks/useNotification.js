import * as React from 'react';

export default function useNotification(initialState = {}) {
  const [notification, setNotification] = React.useState(initialState);

  // React.useEffect(() => {
  //   const clearNotification = setTimeout(() => {
  //     setNotification({});
  //   }, 0);

  //   return () => {
  //     clearTimeout(clearNotification);
  //   };
  // }, []);

  return [notification, setNotification];
}
