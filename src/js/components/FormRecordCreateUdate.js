import * as React from 'react';
import { useParams } from 'react-router-dom';
import FormRecord from './FormRecord';
import { getTimeOfDateISOString } from '../utils/helpers';
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
  const { name, trackEarnings, trackOvertime, ...previousJobAppData } =
    jobs.find((job) => job.id == settings.previousFormData?.jobId) || {};
  const { jobId, ...previousFormData } = settings?.previousFormData;

  const defaults = {
    jobId: 0,
    jobName: '',
    begin: '09:00',
    end: '17:00',
    hoursUnpaid: '',
    dayHours: '',
    rate: '',
    bonus: '',
    weekHours: '',
    daysPerWeek: '',
    paymentType: '',
    monthlyIncome: '',
    derivedhourlyRate: ''
  };

  React.useEffect(() => {
    console.log(defaults);
    console.log(settings.previousFormData);
    console.log(previousJobAppData);
  });

  const initialFormData = {
    ...defaults,
    ...previousFormData,
    ...previousJobAppData,
    dateBegin: new Date(inputDate.getTime())
  };

  return (
    <FormRecord
      jobs={jobs}
      saveRecord={saveRecord}
      inputDate={inputDate}
      settings={settings}
      dispatch={dispatch}
      changeMonth={changeMonth}
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
  const { id } = useParams();
  const record = records?.find((record) => parseInt(record.id) === +id);
  const linkedJob = jobs.find((job) => job.id == record?.jobId);

  const initialFormData = {
    ...record,
    dateBegin: new Date(record.begin).setHours(0, 0, 0, 0),
    begin: getTimeOfDateISOString(record.begin),
    end: getTimeOfDateISOString(record.end)
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
