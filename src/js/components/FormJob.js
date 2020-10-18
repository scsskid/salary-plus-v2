import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Button from './Button';
import Dialog from './Dialog';

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

export function FormJobUpdate({ jobs, saveJob, deleteItem }) {
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
      <FormJob
        handleDispatch={handleDispatch}
        job={job}
        deleteItem={deleteItem}
        history={history}
        isUpdateForm={true}
      />
    </>
  );
}

export default function FormJob({
  handleDispatch,
  job,
  deleteItem,
  history,
  isUpdateForm
}) {
  const [formData, setFormData] = React.useState(
    job || {
      name: 'Unnamed Job',
      rate: 0,
      id: 'AUTOINCREMENT'
    }
  );
  const [dialogOpen, setDialogOpen] = React.useState(false);

  function handleDelete(e) {
    e.preventDefault();
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
      <form onSubmit={handleSubmit}>
        <p>ID: {formData.id}</p>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
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
            value={formData.rate}
            onChange={handleChange}
            placeholder="Enter optional rate..."
          />
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
      </Dialog>
    </>
  );
}
