import React from 'react';

function Welcome({ seedFunctions }) {
  const { insertSampleData, insertBootstrapData } = seedFunctions;

  return (
    <div>
      <h1>Welcome</h1>
      <p>
        Thank you for trying out Salary Calendar.{' '}
        <span style={{ display: 'none' }} role="img" aria-label="bowing emoji">
          🙇‍♂️
        </span>
      </p>
      <p>
        <button onClick={insertSampleData}>Insert Sample Data</button>
      </p>
      <p>
        <button onClick={insertBootstrapData}>Start with empty calendar</button>
      </p>
    </div>
  );
}

export default Welcome;
