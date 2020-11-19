import * as React from 'react';
import useDelayedUnmounting from '../hooks/useDelayedUnmounting';

export default function MountHandler({ hook, children }) {
  const [state, show, hide] = hook;
  const defaultClassName = 'mount-handler';
  const className = `${defaultClassName} ${defaultClassName}--${state}`;

  // needs to know timer

  React.useEffect(() => {
    show();
    setTimeout(hide, 5000);
    return () => {};
  }, []);

  return state !== 'unmounted' ? (
    <div className={className}>{children}</div>
  ) : null;
}
