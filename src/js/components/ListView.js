import React from 'react';
import DateDetails from './DateDetails';
import { getDaysInMonth } from '../utils/helpers.js';
import { getRecordsByDate } from '../utils/dataHelpers';

export default function ListView({
  dateRange = false,
  inputDate = new Date(),
  records = [],
  jobs = [],
  settings = {}
}) {
  const tempDate = new Date(inputDate);
  if (!dateRange) {
    dateRange = {
      start: new Date(tempDate.setDate(1)),
      end: new Date(tempDate.setDate(getDaysInMonth(tempDate)))
    };
  }

  const dateRangeCount =
    Math.floor((dateRange.start - dateRange.end) / (24 * 60 * 60 * 1000)) * -1;

  const dateList = Array(dateRangeCount)
    .fill()
    .map((_, i) => {
      const date = new Date(dateRange.start.getTime());
      date.setDate(date.getDate() + i);
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
              date={date}
              jobs={jobs}
              records={records}
              settings={settings}
            />
          </div>
        )
      );
    });

  return (
    <div className="view-list">
      {dateList.length > 0 ? dateList : <div>empty</div>}
    </div>
  );
}
