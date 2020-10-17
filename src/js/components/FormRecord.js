import React from 'react';
import { formatDate, getTimeOfDate } from '../utils/helpers';
import { useHistory, useParams } from 'react-router-dom';

export function FormRecordCreate({
  inputDate,
  saveRecord,
  jobs,
  settings,
  presets
}) {
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
        presets={presets}
      />
    </>
  );
}

export function FormRecordUpdate({ saveRecord, jobs, records, presets }) {
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
        presets={presets}
      />
    </>
  );
}

export default function FormRecord({
  saveRecord,
  jobs,
  initialFormData,
  presets
}) {
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

  //  option: { value, label }

  const RenderSelect = ({ name, id, label, options, handleSelectChange }) => {
    <select
      name={name}
      id={id}
      value={formData.jobId}
      onBlur={handleSelectChange}
      onChange={handleSelectChange}
    >
      <option disabled value="selected">
        Select Job
      </option>
      {options.map((option, i) => {
        return (
          <option key={`${label}-${i}`} value={option.value}>
            {option.label}
          </option>
        );
      })}
    </select>;
  };

  function handleChange(e) {
    console.log(e.target);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function handleSelectChange(e) {
    const selectedJobId = parseInt(e.target.value);
    const jobRate = jobs.find((job) => job.id === selectedJobId)?.rate;

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      ['rate']: jobRate
    });
  }

  function handleSelectPresetChange(e) {
    const selectedPresetId = parseInt(e.target.value);
    const presetData = presets.find((preset) => preset.id === selectedPresetId);
    const presetFormData = {
      timeBegin: presetData.timeBegin || '',
      timeEnd: presetData.timeEnd || '',
      rate: presetData.rate || 0
    };

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      ...presetFormData
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleDispatch(formData);
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
            value={formData.jobId}
            onBlur={handleSelectChange}
            onChange={handleSelectChange}
          >
            <option disabled value="selected">
              Select Job
            </option>
            <OptionsJob />
          </select>
        </div>

        <div className="form-el">
          <label htmlFor="preset">Fill from preset</label>
          <select
            name="preset"
            value={formData.preset}
            onBlur={handleSelectPresetChange}
            onChange={handleSelectPresetChange}
          >
            <option disabled value="selected">
              Select Preset to prefill fields
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
