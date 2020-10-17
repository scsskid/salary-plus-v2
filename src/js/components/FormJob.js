import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

export function FormJobCreate({ saveJob }) {
  const history = useHistory();

  function handleDispatch(formData) {
    saveJob(formData);
    history.push('/settings');
  }

  return (
    <>
      <h1>Add New Job</h1>
      <FormJob handleDispatch={handleDispatch} />
    </>
  );
}

export function FormJobUpdate({ saveJob, jobs }) {
  const { jobId } = useParams();
  const history = useHistory();

  const job = jobs.find((job) => job.id === parseInt(jobId));

  function handleDispatch(formData) {
    saveJob(formData);
    history.push('/settings');
  }

  return (
    <>
      <h1>Update Job</h1>
      <FormJob handleDispatch={handleDispatch} job={job} />
    </>
  );
}

export default function FormJob({ handleDispatch, job }) {
  const [state, setState] = React.useState({
    name: 'Unnamed Job',
    rate: 0,
    id: 'AUTOINCREMENT'
  });

  useEffect(() => {
    if (job) {
      setState(job);
    }
  }, [job]);

  function handleSubmit(e) {
    e.preventDefault();
    handleDispatch(state);
  }

  function handleChange(e) {
    // console.log(e.target.name);
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <p>ID: {state.id}</p>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
            required
            placeholder="Enter a job name..."
          />
        </div>
        <div>
          <label htmlFor="name">Rate</label>
          <input
            type="number"
            step="0.01"
            name="rate"
            value={state.rate}
            onChange={handleChange}
            placeholder="Enter optional rate..."
          />
        </div>

        <div>
          {/* <button className="btn">Cancel</button> */}
          <button className="btn" type="submit">
            Save
          </button>
        </div>
      </form>
    </>
  );
}
