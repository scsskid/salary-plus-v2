import React from 'react';
import {
  pad,
  getDayName,
  getFirstDay,
  getDaysInMonth
} from '../helpers/helpers.js';

function CalendarBody({ inputDate }) {
  let date = 1;
  const firstDay = getFirstDay(inputDate);
  const daysInMonth = getDaysInMonth(inputDate);

  console.log(`
    first Day of this month (${pad(
      inputDate.getMonth() + 1
    )}) starts on a ${getDayName(getFirstDay(inputDate))}
    (${getFirstDay(inputDate)})

    Month has ${getDaysInMonth(inputDate)} Dates
  `);

  let rows = [];

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
        cells.push(<td key={`weekday-bodycell-${j}`}>{date}</td>);
        date++;
      }
    }

    rows.push(<tr key={`weekday-bodyrow-${i}`}>{cells}</tr>);
  }
  return <tbody>{rows}</tbody>;
}

export default CalendarBody;
