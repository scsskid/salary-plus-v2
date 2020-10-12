import React from 'react';
import { useParams, useParmas } from 'react-router-dom';

const JobForm = function ({ jobs }) {
  const params = useParams();

  console.log(jobs);
  const formData = jobs.find((job) => job.id === parseInt(params.id));

  console.log(formData);

  const { name, status, rate } = formData;

  return (
    <>
      <h1>Edit Job</h1>
      <form>
        <div>ID: {params.id}</div>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" defaultValue={name} />
        </div>
        <div>
          <label htmlFor="name">Rate</label>
          <input type="decimal" defaultValue={rate} />
        </div>
        <div>
          <label htmlFor="name">Status</label>
          <input type="text" defaultValue={status} />
        </div>
        <div>
          <button className="btn">Cancel</button>
          <button className="btn" type="submit">
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default JobForm;
