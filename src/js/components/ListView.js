import React from 'react';
import DateDetails from './DateDetails';
import {
  getRecordsByDate,
  getMinMaxDateBeginOfRecords
} from '../utils/dataHelpers';

export default function ListView({ records = [], jobs = [], settings = {} }) {
  const [start, end] = getMinMaxDateBeginOfRecords(records) || [0, 0];
  const dateRange = { start, end };

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
      {dateList.length > 0 ? dateList : <div>No Records</div>}
    </div>
  );
}
