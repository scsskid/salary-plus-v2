import React from 'react';
import { pad } from '../helpers/helpers.js';

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
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  let cells = [];
  for (let i = 0; i < 7; i++) {
    cells.push(<td key={`weekday-headcell-${i}`}>{dayNames[i]}</td>);
  }

  return (
    <thead>
      <tr>{cells}</tr>
    </thead>
  );
}

function CalendarBody(inputDate) {
  // getFirstDay(inputDate);

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

// Get First (Week-)Day
function getFirstDay(date) {
  let tempDate = new Date(date.getTime());
  tempDate.setDate(1);
  console.log('getFWD', tempDate, (tempDate.getDay() + 6) % 7);
}
