import React from 'react';
import { useHistory } from 'react-router-dom';
import FormJob from './FormJob';

const FormJobCreate = function ({ saveJob }) {
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
};

export default FormJobCreate;
