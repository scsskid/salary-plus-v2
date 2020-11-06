import React from 'react';
import { useHistory } from 'react-router-dom';

const Settings = ({ jobs, children }) => {
  const history = useHistory();

  return (
    <>
      <header className="component-header">
        <h1>Settings</h1>
      </header>

      {/* <h2>General</h2>
      <label htmlFor="language">Languge</label>
      <select name="language">
        <option>DE</option>
        <option>EN</option>
      </select> 
      <hr></hr>*/}
      <h2>Jobs</h2>
      {jobs.map((job) => (
        <div key={job.id}>
          {job.name}(
          {new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR'
          }).format(job.rate)}
          ){' '}
          <button
            className="btn"
            onClick={() => history.push(`/jobs/${job.id}`)}
          >
            Edit
          </button>
        </div>
      ))}
      <div>
        <button className="btn" onClick={() => history.push(`/jobs/add`)}>
          Add New Job
        </button>
      </div>

      {children}
    </>
  );
};

export default Settings;
