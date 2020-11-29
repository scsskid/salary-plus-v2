// eslint-disable no-unused-vars
import * as React from 'react';
import { useParams } from 'react-router-dom';
import FormRecord from './FormRecord';
import { getTimeOfDateISOString } from '../utils/helpers';
import NoMatch from './NoMatch';

export function FormRecordCreate(props) {
  const { settings = {}, jobs = [], inputDate = new Date() } = props;

  const {
    /* eslint-disable no-unused-vars */
    trackEarnings,
    trackOvertime,
    /* eslint-enable no-unused-vars */
    jobName: jobName = '',
    id: jobId = 0,
    ...previousJobAppData
  } = jobs.find((job) => job.id == settings.previousFormData?.jobId) || {};

  const { previousFormData } = settings?.previousFormData || {};

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
    paymentType: 'hourly',
    monthlyIncome: ''
  };

  const initialFormData = {
    ...defaults,
    ...previousFormData,
    ...{ ...previousJobAppData, jobId, jobName },
    dateBegin: new Date(inputDate.getTime())
  };

  // React.useEffect(() => {
  //   console.log(defaults);
  //   console.log(previousFormData);
  //   console.log(previousJobAppData);
  //   console.log(initialFormData);
  // }, []);

  return (
    <FormRecord
      {...props}
      initialFormData={initialFormData}
      linkedJob={previousJobAppData}
    />
  );
}

export function FormRecordUpdate(props) {
  const { jobs, records, setInputDate } = props;
  const { id } = useParams();
  const record = records?.find((record) => +record.id === +id);
  const linkedJob = jobs.find((job) => job.id == record?.jobId);
  React.useEffect(() => {
    setInputDate(new Date(record.begin));
  }, []);

  const initialFormDataMigration = {
    paymentType: 'hourly',
    daysPerWeek: '',
    weekHours: '',
    monthlyIncome: ''
  };

  const initialFormData = {
    ...initialFormDataMigration,
    ...record,
    dateBegin: new Date(record.begin).setHours(0, 0, 0, 0),
    begin: getTimeOfDateISOString(record.begin),
    end: getTimeOfDateISOString(record.end)
  };

  return record ? (
    <FormRecord
      {...props}
      linkedJob={linkedJob}
      initialFormData={initialFormData}
      isUpdateForm={true}
    />
  ) : (
    <NoMatch />
  );
}
