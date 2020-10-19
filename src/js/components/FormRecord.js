import React from 'react';
import { formatDate, getTimeOfDate } from '../utils/helpers';
import { useHistory, useParams } from 'react-router-dom';
import Button from './Button';

export function FormRecordCreate({
  inputDate,
  saveRecord,
  jobs,
  settings,
  presets,
  dispatch
}) {
  return (
    <>
      <h1>New Entry</h1>
      {settings.previousJobId}
      <FormRecord
        jobs={jobs}
        saveRecord={saveRecord}
        presets={presets}
        inputDate={inputDate}
        settings={settings}
        dispatch={dispatch}
      />
    </>
  );
}

export function FormRecordUpdate({
  saveRecord,
  jobs,
  records,
  presets,
  deleteItem,
  dispatch
}) {
  const params = useParams();
  const record = records?.find((record) => record.id === parseInt(params?.id));

  return (
    <>
      <h1>Update Entry</h1>
      <FormRecord
        jobs={jobs}
        saveRecord={saveRecord}
        deleteItem={deleteItem}
        presets={presets}
        isUpdateForm={true}
        record={record}
        dispatch={dispatch}
      />
    </>
  );
}

export default function FormRecord({
  saveRecord,
  deleteItem,
  jobs,
  presets,
  isUpdateForm,
  record,
  settings,
  inputDate,
  dispatch
}) {
  const initialFormData = record
    ? {
        id: record.id,
        jobId: parseInt(record.jobId),
        jobName: record.jobName || 'Was undefined!',
        dateBegin: formatDate.rfc3339(new Date(record.begin)),
        timeBegin: getTimeOfDate(new Date(record.begin)),
        timeEnd: getTimeOfDate(new Date(record.end)),
        rate: record.rate,
        bonus: record.bonus,
        preset: 0
      }
    : {
        jobId: settings.previousJobId !== null ? settings.previousJobId : 0,
        jobName:
          jobs?.find((job) => job.id == settings.previousJobId)?.name || '',
        dateBegin: formatDate.rfc3339(inputDate),
        timeBegin:
          settings.previousTimeBegin !== null
            ? settings.previousTimeBegin
            : '15:00',
        timeEnd:
          settings.previousTimeEnd !== null
            ? settings.previousTimeEnd
            : '02:00',
        rate: jobs.find((job) => job.id === settings.previousJobId)?.rate || 0,
        bonus: 0,
        preset: 0
      };

  const history = useHistory();
  const [formData, setFormData] = React.useState(initialFormData);
  const form = React.useRef();
  const inputRate = React.useRef();

  function handleDispatch(formData) {
    saveRecord(formData);
    history.push('/');
  }

  function OptionsJob() {
    return jobs.map((job) => {
      return (
        <option key={`job-${job.id}`} value={job.id}>
          {job.name} {job.rate}
        </option>
      );
    });
  }

  function OptionsPreset() {
    return presets.map((preset) => {
      return (
        <option key={`preset-${preset.id}`} value={preset.id}>
          {preset.name} {preset.rate}
        </option>
      );
    });
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function handleSelectJobChange(e) {
    if (e.target.value == 0) {
      return;
    }
    const selectedJobId = parseInt(e.target.value);
    const job = jobs.find((job) => job.id === selectedJobId);
    // Causes Bug
    // dispatch({ type: 'setPreviousJobId', payload: { id: selectedJobId } });

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      ['rate']: job?.rate || formData.rate,
      ['jobName']: job?.name || ''
    });
  }

  function handleSelectPresetChange(e) {
    if (e.target.value == 0) {
      return;
    }
    const selectedPresetId = parseInt(e.target.value);
    const presetData = presets.find((preset) => preset.id === selectedPresetId);
    const presetFormData = {
      timeBegin: presetData.timeBegin || formData.timeBegin,
      timeEnd: presetData.timeEnd || formData.timeEnd,
      rate: presetData.rate || formData.rate
    };

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      ...presetFormData
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // via useMemo
    // if (!jobs.length) {
    //   dispatch({
    //     type: 'createJob',
    //     payload: { name: formData.name, rate: formData.rate }
    //   });
    // }
    handleDispatch(formData);
  }

  function handleDelete(e) {
    e.preventDefault();
    deleteItem({ type: 'record', id: formData.id });
    history.push('/');
  }

  return (
    <>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
      <form
        ref={form}
        onSubmit={handleSubmit}
        data-record-id={formData.recordId}
      >
        <input type="hidden" name="id" value={formData.id} />

        {jobs.length ? (
          <div className="form-el">
            <label htmlFor="entry-job">Job</label>
            <select
              name="jobId"
              id="entry-job"
              value={formData.jobId}
              onBlur={handleSelectJobChange}
              onChange={handleSelectJobChange}
            >
              <option key={`job-0`} disabled={true} value={0}>
                Select Job...
              </option>
              <OptionsJob />
            </select>
          </div>
        ) : (
          <div className="form-el">
            <label htmlFor="jobName">Job Name</label>
            <input
              name="jobName"
              id="jobName"
              type="text"
              value={formData.jobName}
              onChange={handleChange}
            />
            {/* <p>
              <small>Job will be added to saved Jobs.</small>
            </p> */}
          </div>
        )}
        <div className="form-el">
          <label htmlFor="preset">Preset</label>
          <select
            name="preset"
            value={formData.preset}
            onBlur={handleSelectPresetChange}
            onChange={handleSelectPresetChange}
          >
            <option key={`preset-0`} disabled={true} value={0}>
              Select Preset to prefill fields...
            </option>
            <OptionsPreset />
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
          {/* {jobs.length == 0 && (
            <p>
              <small>
                Rate will linked to above entered jobName and preset in this
                form when selecting this job.
              </small>
            </p>
          )} */}
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
          <Button type="submit" data-button-submit="">
            Save
          </Button>
          {isUpdateForm && (
            <Button
              onClick={handleDelete}
              className="btn-delete"
              data-button-delete=""
            >
              Delete Record
            </Button>
          )}
        </div>

        <div className="form-el"></div>
      </form>
    </>
  );
}
