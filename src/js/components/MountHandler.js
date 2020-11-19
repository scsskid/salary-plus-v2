import * as React from 'react';

export default function MountHandler({ useDelayedUnmounting = [], children }) {
  const [state, show, hide] = useDelayedUnmounting;
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
