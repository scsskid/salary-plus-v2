import React from 'react';

function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h1>404</h1>
      <p>
        Not found: <code>{location.pathname}</code>
      </p>
    </div>
  );
}

export default NoMatch;
