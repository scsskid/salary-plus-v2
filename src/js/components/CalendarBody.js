import { doc } from 'prettier';
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
  const todayDate = new Date();
  const todayShortString = getShortIsoString(todayDate);

  console.log(records);

  let date = 1;
  let rows = [];

  React.useEffect(() => {
    const allDateCells = document.querySelectorAll('[data-date-string]');
    const todayCell = document.querySelector(
      `[data-date-string="${todayShortString}"]`
    );

    if (todayCell) todayCell.dataset.today = '';

    function appendDates() {
      allDateCells.forEach((cell) => {
        // !TODO: Account for 2 more more entries
        // matched Records forEach append to cell?
        const matchedRecord = records.filter((record) => {
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

    appendDates();

    // Cleanup
    return () => {
      tbody.current
        .querySelectorAll('[data-records]')
        .forEach((el) => (el.innerHTML = ``));

      allDateCells.forEach((cell) => cell.removeAttribute('data-today'));
    };
  });

  const currentDate = new Date(inputDate);

  for (let i = 0; i < 6; i++) {
    let cells = [];
    if (date >= daysInMonth) {
      break;
    }
    for (let j = 0; j < 7; j++) {
      const isLeadingCell = i === 0 && j < firstDay;
      const isTrailingCell = date > daysInMonth;

      if (isLeadingCell || isTrailingCell) {
        cells.push(<td key={`weekday-bodycell-${j}`}></td>);
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

  return <tbody ref={tbody}>{rows}</tbody>;
}

export default CalendarBody;

function CalendarCell({ dateString, date }) {
  return (
    <td data-date-string={dateString}>
      <span>{date}</span>
      <span data-records></span>
    </td>
  );
}
