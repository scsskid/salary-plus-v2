import React from 'react';
import { getShortIsoString, isSameDay } from '../utils/helpers.js';

function CalendarBody({
  inputDate,
  records,
  updateInputDate,
  daysInMonth,
  firstDay
}) {
  const tbody = React.useRef();

  const rows = getRows({ inputDate, daysInMonth, firstDay, updateInputDate });
  const todayDate = new Date();
  const todayShortString = getShortIsoString(todayDate);

  React.useEffect(() => {
    const allDateCells = document.querySelectorAll('[data-date-string]');
    const todayCell = document.querySelector(
      `[data-date-string="${todayShortString}"]`
    );

    if (todayCell) todayCell.dataset.today = '';
    appendDates({ nodes: allDateCells, records });

    // Cleanup
    return () => {
      tbody.current
        .querySelectorAll('[data-records]')
        .forEach((el) => (el.innerHTML = ``));

      allDateCells.forEach((cell) => cell.removeAttribute('data-today'));
    };
  }, [inputDate]);

  return (
    <>
      <div className="calendar-body" ref={tbody}>
        {rows}
      </div>
    </>
  );
}

export default CalendarBody;

function getRows({ inputDate, daysInMonth, firstDay, updateInputDate }) {
  const currentDate = new Date(inputDate);
  const rows = [];
  let date = 1;

  for (let i = 0; i < 6; i++) {
    let cells = [];
    if (date >= daysInMonth) {
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
            updateInputDate={updateInputDate}
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

function CalendarCell({ dateString, date, updateInputDate, inputDate }) {
  const rootEl = React.useRef();
  const cellDateObj = new Date(dateString);

  const cellMatchesInputDate = isSameDay(cellDateObj, inputDate);

  function onClick() {
    updateInputDate(new Date(rootEl.current.dataset.dateString));
  }

  function onKeyUp() {
    return;
  }

  return (
    <div
      className="calendar-date"
      ref={rootEl}
      data-date-string={dateString}
      data-selected={cellMatchesInputDate ? `selected` : ``}
    >
      <button
        className="calendar-date-button"
        onClick={onClick}
        onKeyUp={onKeyUp}
      >
        <div className="calendar-date-button-figure">{date}</div>
        <div data-records></div>
      </button>
    </div>
  );
}

function appendDates({ nodes = [], records = [] }) {
  nodes.forEach((cell) => {
    records.filter((record) => {
      const isMatch =
        getShortIsoString(new Date(record.begin)) == cell.dataset.dateString
          ? record
          : null;

      if (isMatch) {
        cell
          .querySelector('[data-records]')
          .insertAdjacentHTML(
            'beforeend',
            `<div class="calendar-date-event"><small>${record.id}</span></div>`
          );
      }
    });
  });
}
