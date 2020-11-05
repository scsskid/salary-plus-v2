import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

function NoMatch() {
  const location = useLocation();
  const history = useHistory();

  function goToStart() {
    history.push('/');
  }

  return (
    <>
      <header class="component-header">
        <h1>404</h1>
      </header>
      <p>
        Not found: <code>{location.pathname}</code>
      </p>
      <p>
        <button className="btn" onClick={goToStart}>
          Go To Start
        </button>
      </p>
    </>
  );
}

export default NoMatch;
