import * as React from 'react';
import { useHistory } from 'react-router-dom';
import FormElement from './FormElement';
import FormElementSet from './FormElementSet';

export default function JobsList({ jobs }) {
  const history = useHistory();

  return (
    <div className="jobs-list">
      <div className="component-header">
        <h1>Jobs List</h1>
        <div>
          <button className="btn" onClick={() => history.push(`/jobs/add`)}>
            New Job
          </button>
        </div>
      </div>
      <div className="component-body">
        <fieldset>
          {jobs.map((job) => (
            <FormElementSet key={job.id}>
              <FormElement label={job.name}>
                <button
                  className="jobs-list-el"
                  onClick={() => history.push(`/jobs/${job.id}`)}
                ></button>
              </FormElement>
            </FormElementSet>
          ))}
        </fieldset>
      </div>
    </div>
  );
}
