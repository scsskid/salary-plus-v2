import * as React from 'react';
import * as helpers from '../utils/helpers.js';
import { getRecordsByDate } from '../utils/dataHelpers.js';

export default function DateCell({
  date,
  inputDate,
  records,
  handleDateClick: handleClick
}) {
  const todayDate = (function () {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  })();
  const matchesTodayDate = helpers.isSameDay(date, todayDate);
  const matchesInputDate = helpers.isSameDay(date, inputDate);
  const dateRecords = getRecordsByDate({
    records,
    date
  });

  function handleKeyUp() {
    return;
  }

  return (
    <div
      className="calendar-date"
      data-date-string={date.toISOString()}
      data-selected={matchesInputDate ? 'selected' : ''}
      data-today={matchesTodayDate ? 'today' : 'foo'}
    >
      <button
        type="button"
        className="calendar-date-button"
        onClick={handleClick}
        onKeyUp={handleKeyUp}
      >
        <div className="calendar-date-button-figure">
          <span>{date.getDate()}</span>
        </div>
        {dateRecords.length > 0 && (
          <div data-records>
            {dateRecords.map((record, i) => (
              <DateCellEventIndicator key={i} record={record} />
            ))}
          </div>
        )}
      </button>
    </div>
  );
}

function DateCellEventIndicator({ record }) {
  return (
    <div className="calendar-date-event">
      <small>{record.id}</small>
    </div>
  );
}
