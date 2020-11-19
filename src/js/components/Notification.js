import * as React from 'react';
import useDelayedUnmounting from '../hooks/useDelayedUnmounting';

export default function Notification({ notification = {} }) {
  const [state, show, hide] = useDelayedUnmounting(5000);
  const defaultClassName = 'notification';
  const className = `${defaultClassName} ${defaultClassName}--${state}`;

  const content = notification?.message;
  console.log(content);

  React.useEffect(() => {
    console.log(notification, state);
    if (content) {
      show();
    } else {
      hide();
    }
  }, [notification]);

  return state !== 'unmounted' ? (
    <div className={className}>{content}</div>
  ) : null;
}
