import React from 'react';
import CalendarBody from './CalendarBody.js';
import DateDetails from './DateDetails.js';
import { getWeekDayNames } from '../utils/helpers.js';

export default function Calendar({
  inputDate,
  updateInputDate,
  jobs,
  settings,
  monthRecords,
  dateRecords,
  children,
  daysInMonth,
  firstDay
}) {
  return (
    <>
      <div className="calendar">
        {children}

        <table className="calendar-table">
          <CalendarHead settings={settings} />
          <CalendarBody
            inputDate={inputDate}
            records={monthRecords}
            updateInputDate={updateInputDate}
            daysInMonth={daysInMonth}
            firstDay={firstDay}
          />
        </table>
        <DateDetails
          inputDate={inputDate}
          jobs={jobs}
          dateRecords={dateRecords}
          settings={settings}
        />
      </div>
    </>
  );
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
