import React from 'react';
import { parseFormData } from '../utils/helpers';

const Settings = ({ settings, jobs, saveJob }) => {
  const jobDetailsEls = [];

  jobs.forEach((job) => {
    jobDetailsEls.push(<JobDetails key={job.id} job={job} saveJob={saveJob} />);
  });

  return (
    <div>
      <h1>Settings</h1>
      <h2>Jobs</h2>
      <hr />
      <table>
        <tbody>{jobDetailsEls}</tbody>
      </table>
    </div>
  );
};

export default Settings;

function JobDetails({ job, saveJob }) {
  function handleSubmit(e) {
    e.preventDefault();
    saveJob(parseFormData(e.target));
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

function EditJobForm({ job }) {
  return (
    <>
      <form>123</form>
    </>
  );
}
