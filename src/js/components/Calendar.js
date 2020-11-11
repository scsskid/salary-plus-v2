import * as React from 'react';
import {
  getShortIsoString,
  getFirstDay,
  getDaysInMonth
} from '../utils/helpers.js';
import Month from './Month.js';
import Weekdays from './Weekdays.js';

export default function Calendar({
  inputDate = new Date(),
  handleDateClick,
  settings,
  records = []
}) {
  const daysInMonth = getDaysInMonth(inputDate);
  const firstDay = getFirstDay(inputDate);

  // useEvents({ records, inputDate });

  React.useEffect(() => {
    const allDateCells = document.querySelectorAll('[data-date-string]');
    const todayDate = new Date();
    const todayShortString = getShortIsoString(todayDate);
    const todayCell = document.querySelector(
      `[data-date-string="${todayShortString}"]`
    );

    if (todayCell) todayCell.dataset.today = '';

    return () => {
      allDateCells.forEach((cell) => cell.removeAttribute('data-today'));
    };
  });

  return (
    <>
      <div className="calendar-body">
        <Weekdays settings={settings} />
        <Month
          inputDate={inputDate}
          daysInMonth={daysInMonth}
          firstDay={firstDay}
          handleDateClick={handleDateClick}
          records={records}
        />
      </div>
    </>
  );
}
