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
  const inputJobIdAppData = jobs.find((job) => job.id == settings.inputJobId);

  let jobId = 0,
    jobName,
    timeBegin,
    timeEnd,
    hoursUnpaid,
    dayHours,
    rate,
    bonus;

  ({
    jobName = '',
    timeBegin = '09:00',
    timeEnd = '17:00',
    hoursUnpaid = '',
    dayHours = '',
    rate = '',
    bonus = ''
  } = settings.previousFormData || {});

  // Try Override if inputJobisSelected
  if (inputJobIdAppData) {
    ({ id: jobId, name: jobName, dayHours, rate, hoursUnpaid } =
      inputJobIdAppData || {});
  }

  const initialFormData = {
    jobId: jobId ?? 0,
    jobName: jobName ?? '',
    dates: [inputDate],
    timeBegin,
    timeEnd,
    hoursUnpaid: hoursUnpaid == 0 ? '' : hoursUnpaid,
    dayHours: dayHours == 0 ? '' : dayHours,
    rate: rate == 0 ? '' : rate,
    bonus: bonus == 0 ? '' : bonus,
    sickLeave: false
  };

  return (
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
  const linkedJob = jobs.find((job) => job.id == record.jobId);
  const {
    id,
    jobId,
    jobName,
    begin,
    end,
    hoursUnpaid = '',
    dayHours = '',
    rate = '',
    bonus = '',
    sickLeave = ''
  } = record;

  const initialFormData = {
    id,
    jobId,
    jobName,
    dates: [new Date(record.begin)],
    timeBegin: getTimeOfDate(new Date(begin)),
    timeEnd: getTimeOfDate(new Date(end)),
    hoursUnpaid,
    dayHours,
    rate,
    bonus,
    sickLeave
  };

  return (
    <FormRecord
      linkedJob={linkedJob}
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
  );
}
