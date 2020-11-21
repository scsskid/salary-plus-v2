import * as React from 'react';
import DateDetailsEntry from './DateDetailsEntry';
import { getRecordsByDate } from '../utils/dataHelpers.js';

export default function DateDetails({ records, jobs, settings, date }) {
  const defaultClassName = 'date-details';
  const dateRecords = [...getRecordsByDate({ records, date })].sort((a, b) => {
    return new Date(a.begin) - new Date(b.begin);
  });

  const content = dateRecords.map((record) => {
    const job = jobs.find((job) => job.id == record.jobId);

    return (
      <DateDetailsEntry
        key={`record-details-${record.id}`}
        record={record}
        job={job}
        settings={settings}
      />
    );
  });
  const hasEntries = content.length > 0;

  return (
    <div
      className={
        !hasEntries
          ? `${defaultClassName} ${defaultClassName}--empty`
          : defaultClassName
      }
    >
      {hasEntries ? content : <div className="nope">No Entries</div>}
    </div>
  );
}
