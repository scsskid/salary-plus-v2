import React from 'react';
import { formatDate, parseFormData, getTimeOfDate } from '../utils/helpers';
import { useHistory, useParams } from 'react-router-dom';

const RecordForm = ({
  inputDate,
  saveRecord,
  jobs,
  settings,
  records,
  mode
}) => {
  const history = useHistory();
  const params = useParams();
  const form = React.useRef();
  const inputRate = React.useRef();
  const requestedRecordId = params?.id;
  const requestedRecord = records?.find(
    (record) => record.id === parseInt(requestedRecordId)
  );
  let formValues;
  const [state, setState] = React.useState({ mode });

  React.useEffect(() => {
    setState({ mode });
  }, [params]);

  if (state.mode === 'update' && typeof requestedRecord === 'undefined') {
    return <>{"Error: Requested to update record, which doesn't exist."}</>;
  }

  if ('insert' === state.mode) {
    formValues = {
      id: 0,
      jobId: settings.defaultJobId,
      dateBegin: formatDate.rfc3339(inputDate),
      timeBegin: '14:00',
      timeEnd: '02:00',
      rate: jobs.find((job) => job.id === settings.defaultJobId)?.rate || 0,
      bonus: 0
    };
  } else if ('update' === state.mode) {
    formValues = {
      id: requestedRecord.id,
      jobId: requestedRecord.jobId,
      dateBegin: formatDate.rfc3339(new Date(requestedRecord.begin)),
      timeBegin: getTimeOfDate(new Date(requestedRecord.begin)),
      timeEnd: getTimeOfDate(new Date(requestedRecord.end)),
      rate: requestedRecord.rate,
      bonus: requestedRecord.bonus
    };
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
    inputRate.current.value = jobs.find(
      (job) => job.id === selectedJobId
    )?.rate;
  };

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    saveRecord(parseFormData(form));
    history.push('/');
    setState({ mode: 'insert' });
  }

  return (
    <>
      <h1>{state.mode}</h1>

      <form
        ref={form}
        onSubmit={handleSubmit}
        data-record-id={formValues.recordId}
      >
        <input type="hidden" name="id" value={formValues.id} />
        <div className="form-el">
          <label htmlFor="entry-job">Job</label>
          <select
            name="jobId"
            id="entry-job"
            type="date"
            onBlur={handleSelectChange}
            onChange={handleSelectChange}
            defaultValue={formValues.jobId}
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
            defaultValue={formValues.dateBegin}
          />
        </div>
        <div className="form-el">
          <label htmlFor="entry-begin-time">Begin Time</label>
          <input
            name="timeBegin"
            id="entry-begin-time"
            type="time"
            defaultValue={formValues.timeBegin}
          />
        </div>
        <div className="form-el">
          <label htmlFor="entry-end-time">End Time</label>
          <input
            name="timeEnd"
            id="entry-end-time"
            type="time"
            defaultValue={formValues.timeEnd}
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
            value={formValues.rate}
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
            defaultValue={formValues.bonus}
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
};

export default RecordForm;
