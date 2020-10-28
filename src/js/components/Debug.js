import React from 'react';

export default function Debug({ isLoggedIn, settings, dispatch }) {
  return (
    <footer style={{ paddingTop: 40 }}>
      {isLoggedIn && (
        <>
          <button className="btn" onClick={() => dispatch({ type: 'reset' })}>
            Reset App (Bootstrap)
          </button>
          <button
            className="btn"
            onClick={() => dispatch({ type: 'deleteAppData' })}
          >
            Delete App Data
          </button>
          <button
            className="btn"
            onClick={() => dispatch({ type: 'insertSampleData' })}
          >
            Insert Sample App Data
          </button>

          <pre style={{ fontSize: '.6rem', display: 'none' }}>
            userSettings: {JSON.stringify(settings, null, 2)}
          </pre>
        </>
      )}
      <div style={{ fontSize: '.8rem', opacity: 0.5 }}>
        state: {isLoggedIn ? 'logged in' : 'logged out'}
      </div>
    </footer>
  );
}
