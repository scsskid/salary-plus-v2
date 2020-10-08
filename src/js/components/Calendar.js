import React, { useEffect } from 'react';
import CalendarBody from './CalendarBody.js';
import CalendarHead from './CalendarHead.js';
import CalendarControls from './CalendarControls.js';
import { pad, shiftRecordsDates } from '../helpers/helpers.js';
import sampleData from '../../data/sample-data';

function Calendar({ inputDate, changeMonth }) {
  const dataShifted = shiftRecordsDates({ data: sampleData, summand: 7 });

  const currentRecords = getRecordsByMonth({
    records: dataShifted.records,
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
      <table>
        <CalendarHead />
        <CalendarBody inputDate={inputDate} records={currentRecords} />
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
