import React, { useEffect } from 'react';
import {
  pad,
  getDayName,
  getFirstDay,
  getDaysInMonth
} from '../helpers/helpers.js';

function Calendar(props) {
  const { inputDate } = props;
  const dateString = `${inputDate.getFullYear()}-${pad(
    inputDate.getMonth() + 1
  )}-${pad(inputDate.getDate())}`;
  console.log(inputDate.toString());

  useEffect(() => {
    console.log('effect');
  });

  return (
    <div className="calendar">
      <h1>Calendar</h1>
      <p>
        <code>inputDate: {dateString}</code>
      </p>

      <table>
        <CalendarHead />
        <CalendarBody inputDate={inputDate} />
      </table>
    </div>
  );
}

function CalendarHead() {
  let cells = [];
  for (let i = 0; i < 7; i++) {
    cells.push(<td key={`weekday-headcell-${i}`}>{getDayName(i)}</td>);
  }

  return (
    <thead>
      <tr>{cells}</tr>
    </thead>
  );
}

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

function appendEvents() {}

export default Calendar;
