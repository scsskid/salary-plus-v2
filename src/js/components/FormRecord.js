import React from 'react';
import { formatDate, getTimeOfDate } from '../utils/helpers';
import { useHistory, useParams } from 'react-router-dom';
import Button from './Button';

export function FormRecordCreate({
  inputDate,
  saveRecord,
  jobs,
  settings,
  presets
}) {
  return (
    <>
      <h1>New Entry</h1>
      <FormRecord
        jobs={jobs}
        saveRecord={saveRecord}
        presets={presets}
        inputDate={inputDate}
        settings={settings}
      />
    </>
  );
}

export function FormRecordUpdate({
  saveRecord,
  jobs,
  records,
  presets,
  deleteItem
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
  inputDate
}) {
  const initialFormData = record
    ? {
        id: record.id,
        jobId: record.jobId,
        jobName: jobs?.find((job) => job.id === record.jobId).name,
        dateBegin: formatDate.rfc3339(new Date(record.begin)),
        timeBegin: getTimeOfDate(new Date(record.begin)),
        timeEnd: getTimeOfDate(new Date(record.end)),
        rate: record.rate,
        bonus: record.bonus,
        preset: false
      }
    : {
        jobId: settings.defaultJobId,
        dateBegin: formatDate.rfc3339(inputDate),
        timeBegin: '15:00',
        timeEnd: '02:00',
        rate: jobs.find((job) => job.id === settings.defaultJobId)?.rate || 0,
        bonus: 0,
        preset: false
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

  function handleSelectChange(e) {
    const selectedJobId = parseInt(e.target.value);
    const job = jobs.find((job) => job.id === selectedJobId);

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      ['rate']: job.rate,
      ['jobName']: job.name
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

  function handleDelete(e) {
    e.preventDefault();
    deleteItem({ type: 'record', id: formData.id });
    history.push('/');
  }

  return (
    <>
      <form
        ref={form}
        onSubmit={handleSubmit}
        data-record-id={formData.recordId}
      >
        <input type="hidden" name="id" value={formData.id} />
        {formData.jobName}
        <div className="form-el">
          <label htmlFor="entry-job">Job</label>
          <select
            name="jobId"
            id="entry-job"
            value={formData.jobId}
            onBlur={handleSelectChange}
            onChange={handleSelectChange}
          >
            <option value={0}>No Job</option>
            <OptionsJob />
          </select>
        </div>

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
