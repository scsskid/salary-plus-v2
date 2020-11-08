import React from 'react';
import {
  getShortIsoString,
  getWeekDayNames,
  getFirstDay,
  getDaysInMonth
} from '../utils/helpers.js';

function Calendar({
  inputDate = new Date(),
  onCalendarDateButtonClick,
  settings
}) {
  const daysInMonth = getDaysInMonth(inputDate);
  const firstDay = getFirstDay(inputDate);

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
        <CalendarHead settings={settings} />
        <CalendarRows
          inputDate={inputDate}
          daysInMonth={daysInMonth}
          firstDay={firstDay}
          onCalendarDateButtonClick={onCalendarDateButtonClick}
        />
      </div>
    </>
  );
}

export default Calendar;

function CalendarRows({
  inputDate,
  daysInMonth,
  firstDay,
  onCalendarDateButtonClick
}) {
  const currentDate = new Date(inputDate);
  const rows = [];
  let date = 1;

  for (let i = 0; i < 6; i++) {
    let cells = [];
    if (date > daysInMonth) {
      break;
    }
    for (let j = 0; j < 7; j++) {
      const isLeadingCell = i === 0 && j < firstDay;
      const isTrailingCell = date > daysInMonth;

      if (isLeadingCell || isTrailingCell) {
        cells.push(
          <div
            className="calendar-date calendar-date--empty"
            key={`weekday-bodycell-${j}`}
          ></div>
        );
      } else {
        currentDate.setDate(date);
        cells.push(
          <CalendarCell
            dateString={getShortIsoString(currentDate)}
            date={date}
            key={`weekday-bodycell-${j}`}
            onCalendarDateButtonClick={onCalendarDateButtonClick}
            inputDate={inputDate}
          />
        );
        date++;
      }
    }

    rows.push(
      <div className="calendar-week" key={`weekday-bodyrow-${i}`}>
        {cells}
      </div>
    );
  }

  return rows;
}

function CalendarCell({ dateString, date, onCalendarDateButtonClick }) {
  const rootEl = React.useRef();

  function onKeyUp() {
    return;
  }

  return (
    <div className="calendar-date" ref={rootEl} data-date-string={dateString}>
      <button
        type="button"
        className="calendar-date-button"
        onClick={onCalendarDateButtonClick}
        onKeyUp={onKeyUp}
      >
        <div className="calendar-date-button-figure">
          <span>{date}</span>
        </div>
        <div data-records></div>
      </button>
    </div>
  );
}

function CalendarHead({ settings }) {
  let cells = [];
  for (let i = 0; i < 7; i++) {
    cells.push(
      <div key={`weekday-headcell-${i}`}>
        {getWeekDayNames({ format: 'short', locale: settings.locale })[i]}
      </div>
    );
  }

  return <div className="calendar-weekdays">{cells}</div>;
}
