import React from 'react';
import CalendarBody from './CalendarBody.js';
import CalendarHead from './CalendarHead.js';
import CalendarControls from './CalendarControls.js';
import { pad } from '../helpers/helpers.js';
import sampleData from '../../data/sample-data';

function Calendar({ inputDate, changeMonth, updateInputDate }) {
  const currentRecords = getRecordsByMonth({
    records: sampleData.records,
    inputDate
  });

  return (
    <div className="calendar">
      <h1>Calendar</h1>
      <p>
        <code>
          inputDate:{` `}
          {`${inputDate.getFullYear()}-${pad(inputDate.getMonth() + 1)}-${pad(
            inputDate.getDate()
          )}`}
        </code>
      </p>
      <CalendarControls changeMonth={changeMonth} />
      <table className="calendar-table">
        <CalendarHead />
        <CalendarBody
          inputDate={inputDate}
          records={currentRecords}
          updateInputDate={updateInputDate}
        />
      </table>
    </div>
  );
}

// function appendEvents() {}

function getRecordsByMonth({ records, inputDate }) {
  return records.filter((record) => {
    const beginDate = new Date(record.begin);
    return (
      beginDate.getMonth() === inputDate.getMonth() &&
      beginDate.getFullYear() === inputDate.getFullYear()
    );
  });
}

export default Calendar;
