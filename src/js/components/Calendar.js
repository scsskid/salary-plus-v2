import React from 'react';
import {
  getShortIsoString,
  getWeekDayNames,
  getFirstDay,
  getDaysInMonth,
  isSameMonth
} from '../utils/helpers.js';

export default function Calendar({
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
        <Month
          inputDate={inputDate}
          daysInMonth={daysInMonth}
          firstDay={firstDay}
          onCalendarDateButtonClick={onCalendarDateButtonClick}
        />
      </div>
    </>
  );
}

function WeekRow({
  inputDate,
  dateWalker,
  bleedMonth,
  onCalendarDateButtonClick
}) {
  const cells = [];
  // bleedMonth = true;

  for (let i = 0; i < 7; i++) {
    if (!bleedMonth && !isSameMonth(dateWalker, inputDate)) {
      cells.push(
        <div
          className="calendar-date calendar-date--empty"
          key={`weekday-bodycell-${i}`}
        ></div>
      );
    } else {
      cells.push(
        <CalendarCell
          key={i}
          dateString={getShortIsoString(dateWalker)}
          date={dateWalker.getDate()}
          onCalendarDateButtonClick={onCalendarDateButtonClick}
          inputDate={inputDate}
        />
      );
    }
    dateWalker.setDate(dateWalker.getDate() + 1);
  }

  return (
    <>
      <div className="week-row calendar-week">{cells}</div>
    </>
  );
}

function Month({
  inputDate,
  daysInMonth,
  firstDay,
  onCalendarDateButtonClick
}) {
  const weeks = [];
  const dateWalker = new Date(inputDate.getTime());

  for (let i = 1; i < 42; i = i + 7) {
    const currentDate = new Date(dateWalker.setDate(i));
    const weekStartOffset = getWeekStartDateOffset(currentDate);
    currentDate.setDate(weekStartOffset);

    if (currentDate.getMonth() > inputDate.getMonth()) {
      break;
    }
    weeks.push(
      <WeekRow
        key={i}
        daysInMonth={daysInMonth}
        firstDay={firstDay}
        dateWalker={currentDate}
        inputDate={inputDate}
        onCalendarDateButtonClick={onCalendarDateButtonClick}
      />
    );
  }

  return weeks;
}

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

function getWeekStartDateOffset(angleDate, weekStartsOn = 'monday') {
  const date = angleDate.getDate();
  const day = angleDate.getDay();
  const startDate = weekStartsOn === 'monday' ? date - day + 1 : date - day;
  return startDate <= date ? startDate : startDate - 7; // set walkerInput to -7 days if value not in the past
}
