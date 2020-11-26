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
    paymentType: '',
    monthlyIncome: '',
    derivedHourlyRate: ''
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
      initialFormData={initialFormData}
      linkedJob={previousJobAppData}
      {...props}
    />
  );
}

export function FormRecordUpdate(props) {
  const { jobs, records } = props;
  const { id } = useParams();
  const record = records?.find((record) => +record.id === +id);
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
      initialFormData={initialFormData}
      isUpdateForm={true}
      {...props}
    />
  ) : (
    <NoMatch />
  );
}
