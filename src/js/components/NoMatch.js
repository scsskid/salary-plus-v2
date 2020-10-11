import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

function NoMatch() {
  const location = useLocation();
  const history = useHistory();

  function goToStart() {
    history.push('/');
  }

  return (
    <div>
      <h1>404</h1>
      <p>
        Not found: <code>{location.pathname}</code>
      </p>
      <p>
        <button onClick={goToStart}>Go To Start</button>
      </p>
    </div>
  );
}

export default NoMatch;
