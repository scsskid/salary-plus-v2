import React from 'react';
import { useParams } from 'react-router-dom';
import FormRecord from './FormRecord';
import { formatDate, getTimeOfDate } from '../utils/helpers';

export function FormRecordCreate({
  inputDate,
  saveRecord,
  jobs,
  settings,
  dispatch,
  changeMonth
}) {
  const [selectedDates, setSelectedDates] = React.useState([]);

  const initialFormData = {
    jobId: settings.previousJobId !== null ? settings.previousJobId : 0,
    jobName: jobs?.find((job) => job.id == settings.previousJobId)?.name || '',
    dateBegin: formatDate.rfc3339(inputDate),
    timeBegin:
      settings.previousTimeBegin !== null
        ? settings.previousTimeBegin
        : '15:00',
    timeEnd:
      settings.previousTimeEnd !== null ? settings.previousTimeEnd : '02:00',
    rate: jobs.find((job) => job.id === settings.previousJobId)?.rate || 0,
    bonus: 0,
    sickLeave: false
  };

  return (
    <>
      <div className="component-header">
        <h1>New Entry</h1>
      </div>

      <FormRecord
        jobs={jobs}
        saveRecord={saveRecord}
        inputDate={inputDate}
        settings={settings}
        dispatch={dispatch}
        changeMonth={changeMonth}
        selectedDates={selectedDates}
        setSelectedDates={setSelectedDates}
        initialFormData={initialFormData}
      />
    </>
  );
}

export function FormRecordUpdate({
  saveRecord,
  jobs,
  records,
  deleteItem,
  dispatch,
  settings,
  changeMonth,
  inputDate
}) {
  const params = useParams();
  const record = records?.find((record) => record.id === parseInt(params?.id));
  const initialFormData = {
    id: record.id,
    jobId: parseInt(record.jobId),
    jobName: record.jobName || 'Was undefined!',
    dateBegin: formatDate.rfc3339(new Date(record.begin)),
    timeBegin: getTimeOfDate(new Date(record.begin)),
    timeEnd: getTimeOfDate(new Date(record.end)),
    rate: record.rate,
    bonus: record.bonus,
    sickLeave: record.sickLeave || false
  };

  return (
    <>
      <div className="component-header">
        <h1>Update Entry</h1>
      </div>
      <FormRecord
        jobs={jobs}
        saveRecord={saveRecord}
        deleteItem={deleteItem}
        isUpdateForm={true}
        dispatch={dispatch}
        settings={settings}
        changeMonth={changeMonth}
        inputDate={inputDate}
        initialFormData={initialFormData}
      />
    </>
  );
}
