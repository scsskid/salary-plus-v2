import * as React from 'react';

// function notificationReducer(state, payload) {
//   switch (type) {
//     case 'ADD':
//       return {
//         ...state
//       };
//   }
// }

export default function useNotification(initialState) {
  const [notification, setNotification] = React.useState(initialState);

  React.useEffect(() => {
    const clearNotification = setTimeout(() => {
      setNotification({});
    }, 2000);

    return () => {
      clearTimeout(clearNotification);
    };
  }, [notification]);

  return [notification, setNotification];
}
