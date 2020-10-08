import React, { useEffect } from 'react';
import CalendarBody from './CalendarBody.js';
import CalendarHead from './CalendarHead.js';
import CalendarControls from './CalendarControls.js';
import { pad } from '../helpers/helpers.js';

function Calendar({ inputDate, changeMonth }) {
  const dateString = `${inputDate.getFullYear()}-${pad(
    inputDate.getMonth() + 1
  )}-${pad(inputDate.getDate())}`;

  return (
    <div className="calendar">
      <h1>Calendar</h1>
      <p>
        <code>inputDate: {dateString}</code>
      </p>
      <CalendarControls changeMonth={changeMonth} />
      <table>
        <CalendarHead />
        <CalendarBody inputDate={inputDate} />
      </table>
    </div>
  );
}

// function appendEvents() {}

export default Calendar;
