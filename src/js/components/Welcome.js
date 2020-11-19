import * as React from 'react';
import Button from './Button';

export default function Welcome({ seedFunctions }) {
  const { insertSampleData, insertBootstrapData } = seedFunctions;

  return (
    <>
      <header className="app-header">
        <h1>Welcome</h1>
      </header>
      <p>
        Thank you for trying out Salary Calendar.{' '}
        <span style={{ display: 'none' }} role="img" aria-label="bowing emoji">
          🙇‍♂️
        </span>
      </p>
      <p>
        <Button className="btn" onClick={insertSampleData}>
          Insert Sample Data
        </Button>{' '}
        <Button className="btn" onClick={insertBootstrapData}>
          Start as new User
        </Button>
      </p>
    </>
  );
}
