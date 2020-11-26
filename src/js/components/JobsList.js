import * as React from 'react';
import { useHistory } from 'react-router-dom';
import Button from './Button';
import FormButtonRow from './FormButtonRow';
import FormElement from './FormElement';

export default function JobsList({ jobs }) {
  const history = useHistory();

  return (
    <div className="jobs-list">
      <FormButtonRow>
        <Button actionType="cancel">Back</Button>
        <Button onClick={() => history.push(`/jobs/add`)}>New</Button>
      </FormButtonRow>

      <div className="component-body">
        <fieldset>
          {jobs.map((job) => (
            <FormElement label={job.jobName + ' →'} key={job.id}>
              <div
                className="jobs-list-el-color"
                style={{ backgroundColor: job.color }}
              ></div>
              <button
                className="jobs-list-el"
                onClick={() => history.push(`/jobs/${job.id}`)}
              ></button>
            </FormElement>
          ))}
        </fieldset>
      </div>
    </div>
  );
}
