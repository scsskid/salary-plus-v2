import React from 'react';

const Calendar = (props) => {
  const { inputDate } = props;
  const dateString = `${inputDate.getFullYear()} ${inputDate.getMonth() + 1}`;
  console.log(inputDate.toString());

  return (
    <div className="calendar">
      <h1>Calendar</h1>
      <p>{dateString}</p>
    </div>
  );
};

export default Calendar;
