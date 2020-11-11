import React from 'react';
import DateDetails from './DateDetails';
import { getDaysInMonth } from '../utils/helpers.js';
import { getRecordsByDate } from '../utils/dataHelpers';

export default function ListView({ inputDate, records, jobs, settings }) {
  const dateList = Array(getDaysInMonth(inputDate))
    .fill()
    .map((_, i) => {
      const date = new Date(inputDate.getTime());
      date.setDate(i + 1);
      const dateRecords = getRecordsByDate({ records, date });
      const hasRecords = dateRecords.length > 0;

      return (
        hasRecords && (
          <div className="view-list-date" key={i}>
            <h1 className="view-list-date-title">
              {date.toLocaleDateString(undefined, {
                weekday: 'long',
                month: 'short',
                day: 'numeric'
              })}
            </h1>

            <DateDetails
              inputDate={inputDate}
              jobs={jobs}
              records={records}
              settings={settings}
            />
          </div>
        )
      );
    });

  return <div>{dateList}</div>;
}
