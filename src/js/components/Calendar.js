import React from 'react';

const Calendar = (props) => {
  const { inputDate } = props;
  const dateString = `${inputDate.getFullYear()} ${inputDate.getMonth() + 1}`;
  console.log(inputDate.toString());

  return (
    <div className="calendar">
      <h1>Calendar</h1>
      <p>{dateString}</p>
      <TableOuter />
    </div>
  );
};

export default Calendar;

function TableOuter() {
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  let cells = [];
  for (let i = 0; i < 7; i++) {
    cells.push(<td>{dayNames[i]}</td>);
  }

  return (
    <table>
      <tbody>
        <tr>{cells}</tr>
      </tbody>
    </table>
  );
}
