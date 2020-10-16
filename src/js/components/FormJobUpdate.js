import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import FormJob from './FormJob';

const JobForm = function ({ jobs, saveJob }) {
  const { jobId } = useParams();
  const history = useHistory();

  function handleDispatch(formData) {
    saveJob(formData);
    history.push('/settings');
  }

  return (
    <>
      <h1>Update Job</h1>
      <FormJob handleDispatch={handleDispatch} id={jobId} />
    </>
  );
};

export default JobForm;
