import * as React from 'react';
import { useParams } from 'react-router-dom';
import FormRecord from './FormRecord';
import { getTimeOfDate } from '../utils/helpers';
import NoMatch from './NoMatch';

export function FormRecordCreate({
  inputDate,
  saveRecord,
  jobs,
  settings,
  dispatch,
  changeMonth,
  clock,
  records
}) {
  const [selectedDates, setSelectedDates] = React.useState([]);
  const previousJobAppData = jobs.find(
    (job) => job.id == settings.previousFormData?.jobId
  );
  // const inputJobIdAppData = jobs.find((job) => job.id == settings.inputJobId);

  let jobId = 0,
    jobName,
    timeBegin,
    timeEnd,
    hoursUnpaid,
    dayHours,
    rate,
    bonus,
    weekHours,
    daysPerWeek,
    paymentType,
    monthlyIncome,
    derivedhourlyRate;

  ({
    timeBegin = '09:00',
    timeEnd = '17:00',
    hoursUnpaid = '',
    dayHours = '',
    rate = '',
    bonus = '',
    weekHours,
    daysPerWeek,
    paymentType,
    monthlyIncome,
    derivedhourlyRate
  } = settings.previousFormData || {});

  jobName = jobs.length ? '' : settings.previousFormData?.jobName;

  // Override if previousJobAppData
  if (previousJobAppData) {
    ({
      id: jobId,
      name: jobName,
      dayHours,
      rate,
      hoursUnpaid,
      weekHours,
      daysPerWeek,
      paymentType,
      monthlyIncome,
      derivedhourlyRate
    } = previousJobAppData || {});
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
    sickLeave: false,
    weekHours,
    daysPerWeek,
    paymentType,
    monthlyIncome,
    derivedhourlyRate
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
      clock={clock}
      records={records}
      linkedJob={previousJobAppData}
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
  changeMonth,
  clock
}) {
  const params = useParams();
  const record = records?.find(
    (record) => parseInt(record.id) === parseInt(params?.id)
  );
  const linkedJob = jobs.find((job) => job.id == record?.jobId);
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
    sickLeave = false,
    weekHours,
    daysPerWeek,
    paymentType,
    monthlyIncome,
    derivedhourlyRate
  } = record || {};

  const initialFormData = {
    id,
    jobId,
    jobName,
    dates: [new Date(record?.begin)],
    timeBegin: getTimeOfDate(new Date(begin)),
    timeEnd: getTimeOfDate(new Date(end)),
    hoursUnpaid,
    dayHours,
    rate,
    bonus,
    sickLeave,
    weekHours,
    daysPerWeek,
    paymentType,
    monthlyIncome,
    derivedhourlyRate
  };

  return record ? (
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
      clock={clock}
      records={records}
    />
  ) : (
    <NoMatch />
  );
}
