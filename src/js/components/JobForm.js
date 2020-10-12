import React from 'react';
import { parseFormData } from '../utils/helpers';
import { useHistory, useParams } from 'react-router-dom';

const JobForm = function ({ jobs, saveJob }) {
  const { id } = useParams();
  const history = useHistory();
  const [state, setState] = React.useState('edit');
  let name, status, rate;

  if (state === 'edit') {
    ({ name, status, rate } = jobs.find((job) => job.id === parseInt(id)));
  } else {
    ({ name, status, rate } = {});
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    history.push('/settings');
    saveJob(parseFormData(form));
  }

  return (
    <>
      <h1>Edit Job</h1>
      <form onSubmit={handleSubmit}>
        <div>
          ID: {id} <input type="hidden" name="id" value={id} />
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" defaultValue={name} />
        </div>
        <div>
          <label htmlFor="name">Rate</label>
          <input type="decimal" name="rate" defaultValue={rate} />
        </div>
        <div>
          <label htmlFor="name">Status</label>
          <input type="text" name="status" defaultValue={status} />
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
