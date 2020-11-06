import React from 'react';
import { useHistory } from 'react-router-dom';
import FormElement from './FormElement';
import FormElementSet from './FormElementSet';

const Settings = ({ jobs, children }) => {
  const history = useHistory();

  return (
    <>
      <header className="component-header">
        <h1>Settings</h1>
      </header>
      <fieldset>
        <FormElementSet>
          <FormElement label="Allow override jobs Settings in Records Entry">
            <input type="checkbox" />
          </FormElement>
        </FormElementSet>
      </fieldset>
      <fieldset>
        <FormElementSet>
          <FormElement label="Jobs">
            <button onClick={() => history.push('/jobs')}>
              {jobs.length} →
            </button>
          </FormElement>
        </FormElementSet>
      </fieldset>
      {/* <h2>General</h2>
      <label htmlFor="language">Languge</label>
      <select name="language">
        <option>DE</option>
        <option>EN</option>
      </select> 
      <hr></hr>*/}

      {children}
    </>
  );
};

export default Settings;
