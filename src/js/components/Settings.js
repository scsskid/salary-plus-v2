import React from 'react';
import { useHistory } from 'react-router-dom';
import AppHeader from './AppHeader';
import FormElement from './FormElement';
import FormElementSet from './FormElementSet';

export default function Settings({ jobs, children }) {
  const history = useHistory();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [history]);

  return (
    <>
      <AppHeader>
        <h1>Settings</h1>
      </AppHeader>
      <fieldset>
        <FormElementSet>
          <FormElement label="Language">
            <select>
              <option>English</option>
              <option>Deutsch</option>
            </select>
          </FormElement>
        </FormElementSet>
        <FormElementSet>
          <FormElement label="Allow override jobs Settings in Records Entry">
            <input type="checkbox" />
          </FormElement>
        </FormElementSet>
        <FormElementSet>
          <FormElement label="Display Sick Leave when adding new record">
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

      {children}
    </>
  );
}
