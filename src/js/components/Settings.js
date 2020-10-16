import React from 'react';
import { parseFormData } from '../utils/helpers';
import { useHistory } from 'react-router-dom';

const Settings = ({ jobs, saveJob, presets }) => {
  const jobDetailsEls = [];
  const history = useHistory();
  jobs.forEach((job) => {
    jobDetailsEls.push(<JobDetails key={job.id} job={job} saveJob={saveJob} />);
  });

  return (
    <div>
      <h1>Settings</h1>
      <hr></hr>
      <h2>General</h2>
      <label htmlFor="language">Languge</label>
      <select name="language">
        <option>DE</option>
        <option>EN</option>
      </select>
      <hr></hr>
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
        <button className="btn" onClick={() => history.push(`/jobs/new`)}>
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
        <button className="btn" onClick={() => history.push(`/jobs/new`)}>
          Add New Preset
        </button>
      </div>

      <hr></hr>

      <hr />
    </div>
  );
};

export default Settings;

function JobDetails({ job = null, saveJob, settings }) {
  function handleSubmit(e) {
    e.preventDefault();
    saveJob(parseFormData(e.target));
  }

  if (!job) {
    job = {
      id: settings.incrementIds.jobs + 1
    };
  }

  const formID = `form-${job.id}`;

  return (
    <>
      <tr>
        <td>
          <form id={formID} onSubmit={handleSubmit}>
            {job.id}
            <input type="hidden" name="id" value={job.id} />
          </form>
        </td>
        <td>
          <input
            form={formID}
            name="name"
            type="text"
            defaultValue={job.name}
          />
        </td>
        <td>
          <input
            form={formID}
            name="rate"
            type="decimal"
            defaultValue={job.rate}
          />
        </td>
        <td>
          <button form={formID} type="submit">
            Save
          </button>
        </td>
      </tr>
    </>
  );
}
