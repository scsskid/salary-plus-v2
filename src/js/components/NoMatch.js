import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import AppHeader from './AppHeader';

function NoMatch() {
  const location = useLocation();
  const history = useHistory();

  function goToStart() {
    history.push('/');
  }

  return (
    <>
      <AppHeader>
        <h1>Sorry</h1>
      </AppHeader>
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
