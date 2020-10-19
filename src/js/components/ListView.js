import React from 'react';
import { getRecordsByDate } from '../utils/dataHelpers.js';
import DateDetails from './DateDetails';

export default function ListView({
  inputDate,
  monthRecords,
  daysInMonth,
  jobs,
  settings
}) {
  const dateList = Array(daysInMonth)
    .fill()
    .map((_, i) => {
      const date = new Date(inputDate.getTime());
      date.setDate(i + 1);
      const dateRecords = getRecordsByDate({ records: monthRecords, date });
      const hasRecords = dateRecords.length > 0;

      return (
        hasRecords && (
          <div key={i}>
            <h3>
              {/* day {i + 1} */} {date.toLocaleDateString()}
            </h3>

            <DateDetails
              inputDate={inputDate}
              jobs={jobs}
              dateRecords={dateRecords}
              settings={settings}
            />
          </div>
        )
      );
    });

  return (
    <div>
      <h1>List View for Month</h1>
      {dateList}
    </div>
  );
}
