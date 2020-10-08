import React from 'react';
import {
  getFirstDay,
  getDaysInMonth,
  getShortIsoString
} from '../helpers/helpers.js';

function CalendarBody({ inputDate, records }) {
  const tbody = React.useRef();
  const firstDay = getFirstDay(inputDate);
  const daysInMonth = getDaysInMonth(inputDate);
  const rows = getRows({ inputDate, daysInMonth, firstDay });
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
  });

  return <tbody ref={tbody}>{rows}</tbody>;
}

export default CalendarBody;

function getRows({ inputDate, daysInMonth, firstDay }) {
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
        cells.push(<td key={`weekday-bodycell-${j}`}>123</td>);
      } else {
        currentDate.setDate(date);
        cells.push(
          <CalendarCell
            dateString={getShortIsoString(currentDate)}
            date={date}
            key={`weekday-bodycell-${j}`}
          />
        );
        date++;
      }
    }

    rows.push(<tr key={`weekday-bodyrow-${i}`}>{cells}</tr>);
  }

  return rows;
}

function CalendarCell({ dateString, date }) {
  return (
    <td data-date-string={dateString}>
      <span>{date}</span>
      <span data-records></span>
    </td>
  );
}

function appendDates({ nodes = [], records = [] }) {
  nodes.forEach((cell) => {
    // !TODO: Account for 2 more more entries
    // matched Records forEach append to cell?
    records.filter((record) => {
      const isMatch =
        getShortIsoString(new Date(record.begin)) == cell.dataset.dateString
          ? record
          : null;

      if (isMatch) {
        //
        cell
          .querySelector('[data-records]')
          .insertAdjacentHTML(
            'beforeend',
            `<small style="font-size: .5rem; color: rebeccapurple"> ${record.id}</small>`
          );
      }
    });
  });
}
