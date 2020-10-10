import React from 'react';
import { formatDate } from '../utils/helpers';
import { useHistory } from 'react-router-dom';

const Add = ({ inputDate, saveRecord, userJobs, user }) => {
  const history = useHistory();
  const form = React.useRef();
  const inputRate = React.useRef();
  const defaultFormValues = {
    jobId: user.settings.defaultJobId,
    dateBegin: formatDate.rfc3339(inputDate),
    timeBegin: '14:00',
    timeEnd: '02:00',
    rate:
      userJobs.find((job) => job.id === user.settings.defaultJobId)?.rate || 0,
    bonus: 0
  };

  function OptionsJob() {
    const options = [];

    userJobs.forEach((job) => {
      options.push(
        <option key={`job-${job.id}`} value={job.id}>
          {job.name} {job.rate}
        </option>
      );
    });

    return options;
  }

  const handleSelectChange = (e) => {
    const selectedJobId = parseInt(e.target.value);
    inputRate.current.value = userJobs.find(
      (job) => job.id === selectedJobId
    ).rate;
  };

  function handleSubmit(e) {
    e.preventDefault();
    const formEntries = new FormData(e.target).entries();
    const formData = {};

    for (var [formElementName, value] of formEntries) {
      formData[formElementName] = value;
    }

    saveRecord(formData);
    history.push('/');
  }

  return (
    <div className="add">
      <h1>Add</h1>

      <form ref={form} onSubmit={handleSubmit} action="">
        <div className="form-el">
          <label htmlFor="entry-job">Job</label>
          <select
            name="jobId"
            id="entry-job"
            type="date"
            onBlur={handleSelectChange}
            onChange={handleSelectChange}
            defaultValue={user.settings.defaultJobId}
          >
            <OptionsJob />
          </select>
        </div>
        <div className="form-el">
          <label htmlFor="entry-date">Date</label>
          <input
            name="dateBegin"
            id="entry-date"
            type="date"
            defaultValue={defaultFormValues.dateBegin}
          />
        </div>
        <div className="form-el">
          <label htmlFor="entry-begin-time">Begin Time</label>
          <input
            name="timeBegin"
            id="entry-begin-time"
            type="time"
            defaultValue={defaultFormValues.timeBegin}
          />
        </div>
        <div className="form-el">
          <label htmlFor="entry-end-time">End Time</label>
          <input
            name="timeEnd"
            id="entry-end-time"
            type="time"
            defaultValue={defaultFormValues.timeEnd}
          />
        </div>
        <div className="form-el">
          <label htmlFor="entry-rate">Rate</label>
          <input
            ref={inputRate}
            inputMode="decimal"
            name="rate"
            id="entry-rate"
            type="number"
            step="0.01"
            value={defaultFormValues.rate}
            readOnly
          />{' '}
          €
        </div>
        <div className="form-el">
          <label htmlFor="entry-bonus">Bonus</label>
          <input
            inputMode="decimal"
            name="bonus"
            id="entry-bonus"
            type="number"
            step="0.01"
            defaultValue={defaultFormValues.bonus}
          />{' '}
          €
        </div>
        <div className="form-el">
          <label htmlFor="entry-sick-leave">Sick Leave</label>
          <input name="sickLeave" id="entry-sick-leave" type="checkbox" />
        </div>

        <div className="form-el">
          <button data-button-submit>Save</button>
        </div>

        <div className="form-el"></div>
      </form>
    </div>
  );
};

export default Add;
