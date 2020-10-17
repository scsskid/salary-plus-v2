import React from 'react';
import { formatDate, parseFormData, getTimeOfDate } from '../utils/helpers';
import { useHistory, useParams } from 'react-router-dom';

export function FormRecordCreate({ inputDate, saveRecord, jobs, settings }) {
  const initialFormData = {
    id: 0,
    jobId: settings.defaultJobId,
    dateBegin: formatDate.rfc3339(inputDate),
    timeBegin: '15:00',
    timeEnd: '02:00',
    rate: jobs.find((job) => job.id === settings.defaultJobId)?.rate || 0,
    bonus: 0
  };

  return (
    <>
      <h1>New Entry</h1>
      <FormRecord
        initialFormData={initialFormData}
        jobs={jobs}
        saveRecord={saveRecord}
      />
    </>
  );
}

export function FormRecordUpdate({ saveRecord, jobs, records }) {
  const params = useParams();
  const requestedRecord = records?.find(
    (record) => record.id === parseInt(params?.id)
  );

  const initialFormData = {
    id: requestedRecord.id,
    jobId: requestedRecord.jobId,
    dateBegin: formatDate.rfc3339(new Date(requestedRecord.begin)),
    timeBegin: getTimeOfDate(new Date(requestedRecord.begin)),
    timeEnd: getTimeOfDate(new Date(requestedRecord.end)),
    rate: requestedRecord.rate,
    bonus: requestedRecord.bonus
  };

  return (
    <>
      <h1>Update Entry</h1>
      <FormRecord
        initialFormData={initialFormData}
        jobs={jobs}
        saveRecord={saveRecord}
      />
    </>
  );
}

export default function FormRecord({ saveRecord, jobs, initialFormData }) {
  const history = useHistory();
  const [formData, setFormData] = React.useState(initialFormData);
  const form = React.useRef();
  const inputRate = React.useRef();

  function handleDispatch(formData) {
    console.log(formData);
    saveRecord(formData);
    history.push('/');
  }

  function OptionsJob() {
    const options = [];

    jobs.forEach((job) => {
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
    const ratebyJobId = jobs.find((job) => job.id === selectedJobId)?.rate;

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      ['rate']: ratebyJobId
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    handleDispatch(formData);
  }

  function handleChange(e) {
    console.log(e.target);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  return (
    <>
      <form
        ref={form}
        onSubmit={handleSubmit}
        data-record-id={formData.recordId}
      >
        <input type="hidden" name="id" value={formData.id} />
        <div className="form-el">
          <label htmlFor="entry-job">Job</label>
          <select
            name="jobId"
            id="entry-job"
            type="date"
            onBlur={handleSelectChange}
            onChange={handleSelectChange}
            value={formData.jobId}
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
            value={formData.dateBegin}
            onChange={handleChange}
          />
        </div>
        <div className="form-el">
          <label htmlFor="entry-begin-time">Begin Time</label>
          <input
            name="timeBegin"
            id="entry-begin-time"
            type="time"
            value={formData.timeBegin}
            onChange={handleChange}
          />
        </div>
        <div className="form-el">
          <label htmlFor="entry-end-time">End Time</label>
          <input
            name="timeEnd"
            id="entry-end-time"
            type="time"
            value={formData.timeEnd}
            onChange={handleChange}
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
            value={formData.rate}
            onChange={handleChange}
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
            value={formData.bonus}
            onChange={handleChange}
          />{' '}
          €
        </div>
        <div className="form-el">
          <label htmlFor="entry-sick-leave">Sick Leave</label>
          <input name="sickLeave" id="entry-sick-leave" type="checkbox" />
        </div>

        <div className="form-el">
          <button className="btn" data-button-submit>
            Save
          </button>
        </div>

        <div className="form-el"></div>
      </form>
    </>
  );
}
