import React from 'react';
import Button from './Button';

export default function InputDateControl({ inputDate, changeMonth, settings }) {
  return (
    <header className="calendar-controls">
      <h1>Calendar</h1>
      <p>
        <b>
          {inputDate.toLocaleDateString(undefined, {
            month: 'long',
            timeZone: settings.timeZone
          })}
        </b>
        <br />
        {inputDate.getFullYear()}
      </p>
      <p>
        <Button onClick={() => changeMonth(-1)}>Prev</Button>{' '}
        <Button onClick={() => changeMonth(0)}>Today</Button>{' '}
        <Button onClick={() => changeMonth(1)}>Next</Button>
      </p>
    </header>
  );
}
