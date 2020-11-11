import React from 'react';
import DateDetailsEntry from './DateDetailsEntry';
import { getRecordsByDate, getRecordsByMonth } from '../utils/dataHelpers.js';

export default function DateDetails({ records, jobs, settings, inputDate }) {
  const defaultClassName = 'date-details';
  const dateRecords = getRecordsByDate({ records, inputDate });

  const content = dateRecords.map((record) => {
    return (
      <DateDetailsEntry
        key={`record-details-${record.id}`}
        record={record}
        jobs={jobs}
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
