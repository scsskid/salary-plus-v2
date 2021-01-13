import * as React from 'react';
import { getRecordsByDate } from '../utils/dataHelpers.js';

export default function DateCell({
  date = new Date(),
  records = [],
  handleDateClick = () => {},
  jobs = []
  // isBleedDate = false
}) {
  const dateRecords = getRecordsByDate({
    records,
    date
  });

  const day = date
    .toLocaleDateString('en-US', { weekday: 'short' })
    .toLowerCase();

  function handleKeyUp() {
    return;
  }

  return (
    <div
      className="calendar-date"
      data-date-string={date.toISOString()}
      data-day={day}
      // style={isBleedDate ? { opacity: 0.2 } : null}
    >
      <button
        type="button"
        className="calendar-date-button"
        onClick={handleDateClick}
        onKeyUp={handleKeyUp}
      >
        <div className="calendar-date-button-figure">
          <span>{date.getDate()}</span>
        </div>
        {dateRecords.length > 0 && (
          <div data-records>
            {dateRecords.map((record, i) => (
              <DateCellEventIndicator key={i} record={record} jobs={jobs} />
            ))}
          </div>
        )}
      </button>
    </div>
  );
}

function DateCellEventIndicator({ record, jobs = [] }) {
  const job = jobs.find((job) => job.id == record.jobId);

  return (
    <div
      className="calendar-date-event"
      style={{ backgroundColor: job?.color }}
    >
      <small>{record.id}</small>
    </div>
  );
}
