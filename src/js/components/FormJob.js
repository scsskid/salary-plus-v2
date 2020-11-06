import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { Prompt } from 'react-router';
import Button from './Button';
import Dialog from './Dialog';
import FormElementSet from './FormElementSet';
import FormElement from './FormElement';

export function FormJobCreate({ saveJob }) {
  const history = useHistory();

  const initialFormData = {
    name: '',
    rate: '',
    dayHours: '',
    hoursUnpaid: ''
  };

  return (
    <>
      <div className="component-header">
        <h1>New Job</h1>
      </div>
      <FormJob
        initialFormData={initialFormData}
        saveJob={saveJob}
        history={history}
      />
    </>
  );
}

export function FormJobUpdate({ jobs, saveJob, deleteItem, children }) {
  const { jobId } = useParams();
  const history = useHistory();
  const job = jobs.find((job) => job.id === parseInt(jobId));

  const initialFormData = {
    id: job.id,
    name: job.name,
    rate: job.rate || '',
    dayHours: job.dayHours || '',
    hoursUnpaid: job.hoursUnpaid || ''
  };

  return (
    <>
      <div className="component-header">
        <h1>Update Job</h1>
      </div>
      {children}
      <FormJob
        job={job}
        deleteItem={deleteItem}
        history={history}
        isUpdateForm={true}
        initialFormData={initialFormData}
        saveJob={saveJob}
      />
    </>
  );
}

export default function FormJob({
  deleteItem,
  history,
  isUpdateForm,
  initialFormData,
  saveJob
}) {
  const [formData, setFormData] = React.useState(initialFormData);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  function handleDelete() {
    deleteItem({ type: 'job', id: formData.id });
    history.push('/settings');
  }

  function handleSubmit(e) {
    e.preventDefault();
    saveJob(formData);
    history.push('/jobs');
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit} autoComplete="off">
        <p>ID: {formData.id}</p>
        <fieldset>
          <FormElementSet>
            <FormElement htmlFor="name" label="Job Name">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter a job name..."
              />
            </FormElement>
          </FormElementSet>
        </fieldset>
        <fieldset>
          <FormElementSet>
            <FormElement htmlFor="rate" label="Job Rate">
              <input
                id="rate"
                type="number"
                step="0.01"
                name="rate"
                value={formData.rate}
                onChange={handleChange}
                placeholder="Enter optional rate..."
              />
            </FormElement>
          </FormElementSet>
          <FormElementSet>
            <FormElement htmlFor="dayHours" label="Regular Hours per Day">
              <input
                id="dayHours"
                name="dayHours"
                type="number"
                step="0.1"
                min="0"
                value={formData.dayHours}
                onChange={handleChange}
                placeholder="0"
              />
            </FormElement>
          </FormElementSet>
          <FormElementSet>
            <FormElement
              htmlFor="hoursUnpaid"
              label="Default Unpaid Hours per Day"
            >
              <input
                id="hoursUnpaid"
                name="hoursUnpaid"
                type="number"
                step="0.1"
                min="0"
                value={formData.hoursUnpaid}
                onChange={handleChange}
                placeholder="0"
              />
            </FormElement>
          </FormElementSet>
        </fieldset>

        <div>
          <label htmlFor="name">Rate</label>
        </div>

        <div>
          {/* <button className="btn">Cancel</button> */}
          <Button type="submit" data-button-submit="">
            Save
          </Button>
          {isUpdateForm && (
            <Button
              type="button"
              onClick={() => {
                setDialogOpen(true);
              }}
              className="btn--delete"
              data-button-delete=""
            >
              Delete Job
            </Button>
          )}
        </div>
      </form>
      <pre>{JSON.stringify(formData, null, 2)}</pre>

      <Dialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        buttonConfirmLabel="Delete Job 🗑"
        handleConfirm={handleDelete}
      >
        <h1>Confirm deletion</h1>
        <p>
          Are you sure to permanently delete <b>{formData.name}</b>?
        </p>
        <p>
          <small>
            You will loose the ability to filter reporting by Job, entries wont
            be deleted.
          </small>
        </p>
      </Dialog>
    </>
  );
}
