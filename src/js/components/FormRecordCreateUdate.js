import React from 'react';
import { useParams } from 'react-router-dom';
import FormRecord from './FormRecord';
import { getTimeOfDate } from '../utils/helpers';

export function FormRecordCreate({
  inputDate,
  saveRecord,
  jobs,
  settings,
  dispatch,
  changeMonth
}) {
  const [selectedDates, setSelectedDates] = React.useState([]);
  const {
    jobId = 0,
    jobName = '',
    timeBegin = '08:00',
    timeEnd = '17:00',
    hoursUnpaid = '',
    rate = '',
    bonus = ''
  } = { ...settings.previousFormData };

  const initialFormData = {
    jobId,
    jobName,
    dates: [inputDate],
    timeBegin,
    timeEnd,
    hoursUnpaid,
    rate,
    bonus,
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
  inputDate,
  saveRecord,
  jobs,
  records,
  deleteItem,
  dispatch,
  settings,
  changeMonth
}) {
  const params = useParams();
  const record = records?.find((record) => record.id === parseInt(params?.id));
  const {
    id,
    jobId,
    jobName,
    begin,
    end,
    hoursUnpaid,
    rate,
    bonus,
    sickLeave
  } = record;
  const initialFormData = {
    id,
    jobId,
    jobName,
    dates: [new Date(record.begin)],
    timeBegin: getTimeOfDate(new Date(begin)),
    timeEnd: getTimeOfDate(new Date(end)),
    hoursUnpaid,
    rate,
    bonus,
    sickLeave
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
