import React from 'react';
import CalendarBody from './CalendarBody.js';
import CalendarControls from './CalendarControls.js';
import DateDetails from './DateDetails.js';
import { getWeekDayNames } from '../utils/helpers.js';

export default function Calendar({
  inputDate,
  changeMonth,
  updateInputDate,
  records,
  jobs,
  settings
}) {
  const monthRecords = getRecordsByMonth({
    records,
    inputDate
  });

  const dateRecords = getRecordsByDate({
    records: monthRecords,
    inputDate
  });

  return (
    <div className="calendar">
      <h1>Calendar</h1>
      <p>
        <b>
          {inputDate.toLocaleDateString(undefined, {
            month: 'long',
            timeZone: settings.timeZone
          })}
        </b>
        <br />
        {inputDate.getFullYear()}
      </p>
      <CalendarControls changeMonth={changeMonth} />
      <table className="calendar-table">
        <CalendarHead settings={settings} />
        <CalendarBody
          inputDate={inputDate}
          records={monthRecords}
          updateInputDate={updateInputDate}
        />
      </table>
      <DateDetails
        inputDate={inputDate}
        jobs={jobs}
        dateRecords={dateRecords}
        settings={settings}
      />
    </div>
  );
}

function getRecordsByDate({ records, inputDate }) {
  return records.filter((record) => {
    const beginDate = new Date(record.begin);
    return (
      beginDate.getDate() === inputDate.getDate() &&
      beginDate.getMonth() === inputDate.getMonth() &&
      beginDate.getFullYear() === inputDate.getFullYear()
    );
  });
}

function getRecordsByMonth({ records, inputDate }) {
  return records.filter((record) => {
    const beginDate = new Date(record.begin);
    return (
      beginDate.getMonth() === inputDate.getMonth() &&
      beginDate.getFullYear() === inputDate.getFullYear()
    );
  });
}

function CalendarHead({ settings }) {
  let cells = [];
  for (let i = 0; i < 7; i++) {
    cells.push(
      <td key={`weekday-headcell-${i}`}>
        {getWeekDayNames({ format: 'short', locale: settings.locale })[i]}
      </td>
    );
  }

  return (
    <thead>
      <tr>{cells}</tr>
    </thead>
  );
}
