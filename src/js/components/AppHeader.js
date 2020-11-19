import * as React from 'react';
import useDelayedUnmounting from '../hooks/useDelayedUnmounting';

const opacity = {
  unmounted: 0,
  mounting: 0.2,
  mounted: 1
};

export default function AppHeader({ title = 'Untitled Page', children }) {
  const [state, show, hide] = useDelayedUnmounting(0);

  React.useEffect(() => {
    show();

    return () => {
      hide();
    };
  }, []);

  return (
    <div className="app-header">
      {state !== 'unmounted' && (
        <h1
          style={{
            transition: '2s',
            opacity: opacity[state]
          }}
        >
          {title}
        </h1>
      )}
      <p>{state}</p>
      {children}
    </div>
  );
}
