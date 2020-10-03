import React from 'react';
import { pad, getDayName, getFirstDay } from '../helpers/helpers.js';

const Calendar = (props) => {
  const { inputDate } = props;
  const dateString = `${inputDate.getFullYear()}-${pad(
    inputDate.getMonth() + 1
  )}-${pad(inputDate.getDate())}`;
  console.log(inputDate.toString());

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
};

export default Calendar;

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
  console.log(`
    first Day of this month (${pad(
      inputDate.getMonth() + 1
    )}) starts on a ${getDayName(getFirstDay(inputDate))}
  `);

  let rows = [];

  for (let i = 0; i < 6; i++) {
    let cells = [];

    for (let i = 0; i < 7; i++) {
      cells.push(<td key={`weekday-bodycell-${i}`}></td>);
    }

    rows.push(<tr key={`weekday-bodyrow-${i}`}>{cells}</tr>);
  }
  return <tbody>{rows}</tbody>;
}
