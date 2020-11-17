import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { Prompt } from 'react-router';
import Button from './Button';
import Dialog from './Dialog';
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
    <FormJob
      initialFormData={initialFormData}
      saveJob={saveJob}
      history={history}
    />
  );
}

export function FormJobUpdate({ jobs, saveJob, deleteItem }) {
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
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  function handleNumberChange(e) {
    const value = Number(
      parseFloat(e.target.value) === 0 ? '' : e.target.value
    ).toString();

    setFormData({
      ...formData,
      [e.target.name]: value
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit} autoComplete="off">
        <p>ID: {formData.id}</p>
        <fieldset>
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
        </fieldset>
        <fieldset>
          <FormElement htmlFor="rate" label="Job Rate">
            <input
              id="rate"
              type="number"
              step="0.01"
              name="rate"
              value={formData.rate}
              onChange={handleNumberChange}
              placeholder="Enter optional rate..."
            />
          </FormElement>

          <FormElement htmlFor="dayHours" label="Regular Hours per Day">
            <input
              id="dayHours"
              name="dayHours"
              type="number"
              step="0.1"
              min="0"
              value={formData.dayHours}
              onChange={handleNumberChange}
              placeholder="0"
            />
          </FormElement>

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
              onChange={handleNumberChange}
              placeholder="0"
            />
          </FormElement>
        </fieldset>
        {isUpdateForm && (
          <p>
            <small>
              Updates to Job Settings will only not affect existing records for
              this Job.
            </small>
          </p>
        )}

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
