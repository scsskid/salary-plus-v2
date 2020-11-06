import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Button from './Button';
import Dialog from './Dialog';
import FormElementSet from './FormElementSet';
import FormElement from './FormElement';
// eslint-disable-next-line no-unused-vars
import { Prompt } from 'react-router';

export function FormJobCreate({ saveJob }) {
  const history = useHistory();

  function handleDispatch(formData) {
    saveJob(formData);
    history.push('/settings');
  }

  const initialFormData = {
    name: '',
    rate: '',
    dayHours: '',
    hoursUnpaid: ''
  };

  return (
    <>
      <h1>Add New Job</h1>
      <FormJob
        handleDispatch={handleDispatch}
        initialFormData={initialFormData}
      />
    </>
  );
}

export function FormJobUpdate({ jobs, saveJob, deleteItem, children }) {
  const { jobId } = useParams();
  const history = useHistory();
  const job = jobs.find((job) => job.id === parseInt(jobId));

  function handleDispatch(formData) {
    saveJob(formData);
    history.push('/settings');
  }

  const initialFormData = {
    id: job.id,
    name: job.name,
    rate: job.rate || '',
    dayHours: job.dayHours || '',
    hoursUnpaid: job.hoursUnpaid || ''
  };

  return (
    <>
      <h1>Update Job</h1>
      {children}
      <FormJob
        handleDispatch={handleDispatch}
        job={job}
        deleteItem={deleteItem}
        history={history}
        isUpdateForm={true}
        initialFormData={initialFormData}
      />
    </>
  );
}

export default function FormJob({
  handleDispatch,
  deleteItem,
  history,
  isUpdateForm,
  initialFormData
}) {
  const [formData, setFormData] = React.useState(initialFormData);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  // eslint-disable-next-line no-unused-vars
  function handleDelete(e) {
    // e.preventDefault();
    deleteItem({ type: 'job', id: formData.id });
    history.push('/settings');
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleDispatch(formData);
  }

  function handleChange(e) {
    // console.log(e.target.name);
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
