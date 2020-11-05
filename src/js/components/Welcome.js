import React from 'react';

function Welcome({ seedFunctions }) {
  const { insertSampleData, insertBootstrapData } = seedFunctions;

  return (
    <>
      <header className="component-header">
        <h1>Welcome</h1>
      </header>
      <p>
        Thank you for trying out Salary Calendar.{' '}
        <span style={{ display: 'none' }} role="img" aria-label="bowing emoji">
          🙇‍♂️
        </span>
      </p>
      <p>
        <button className="btn" onClick={insertSampleData}>
          Insert Sample Data
        </button>
      </p>
      <p>
        <button className="btn" onClick={insertBootstrapData}>
          Start with empty calendar
        </button>
      </p>
    </>
  );
}

export default Welcome;
