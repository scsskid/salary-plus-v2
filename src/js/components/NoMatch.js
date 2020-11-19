import * as React from 'react';
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
