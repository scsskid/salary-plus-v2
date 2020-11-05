import React from 'react';
import { useHistory } from 'react-router-dom';

const Settings = ({ jobs, presets, children }) => {
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
      <hr></hr>
      <h2>Presets</h2>
      {presets.map((preset) => (
        <div key={preset.id}>
          {preset.name}
          <br /> ({preset.timeBegin} - {preset.timeEnd},{' '}
          {new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR'
          }).format(preset.rate)}
          ){' '}
          <button
            className="btn"
            onClick={() => history.push(`/presets/${preset.id}`)}
          >
            Edit
          </button>
        </div>
      ))}
      <div>
        <button className="btn" onClick={() => history.push(`/presets/add`)}>
          Add New Preset
        </button>
      </div>

      <hr />
      {children}
    </>
  );
};

export default Settings;
