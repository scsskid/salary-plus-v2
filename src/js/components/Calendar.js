import * as React from 'react';
import Month from './Month.js';
import Weekdays from './Weekdays.js';

export default function Calendar({
  inputDate = new Date(),
  handleDateClick,
  settings,
  records = []
}) {
  return (
    <>
      <div className="calendar-body">
        <Weekdays settings={settings} />
        <Month
          inputDate={inputDate}
          handleDateClick={handleDateClick}
          records={records}
        />
      </div>
    </>
  );
}
