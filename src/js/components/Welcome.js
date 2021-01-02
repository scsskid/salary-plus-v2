import * as React from 'react';
import Button from './Button';
import Version from './Version';

export default function Welcome({ seedFunctions }) {
  const { insertSampleData, insertBootstrapData } = seedFunctions;

  return (
    <>
      <header className="app-header">
        <h1>Salary Plus Alpha Version</h1>
      </header>
      <p>
        With Salary Plus you can keep track of your working hours, income and
        overtime.
      </p>
      <p>
        While not mandatory {"it's"} recommended to add a job to enable more
        flexible reporting and mass-organize your past records in future
        updates. Go to <code>settings/jobs</code> to add a job
      </p>
      <p>
        {/* <Button className="btn" onClick={insertSampleData}>
          Insert Sample Data
        </Button>{' '} */}
        <Button className="btn" onClick={insertBootstrapData}>
          Start
        </Button>
      </p>
      <Version />
    </>
  );
}
