import * as React from 'react';
import DateDetails from './DateDetails.js';
import Month from './Month.js';
import Weekdays from './Weekdays.js';
import WidgetInputDate from './WidgetInputDate.js';

export default function Calendar({
  inputDate = new Date(),
  handleDateClick,
  settings,
  records = [],
  changeMonth,
  jobs = []
}) {
  return (
    <>
      <div className="view-calendar-controls">
        <WidgetInputDate
          inputDate={inputDate}
          settings={settings}
          changeMonth={changeMonth}
        />
      </div>
      <div className="calendar-body">
        <Weekdays settings={settings} />
        <Month
          inputDate={inputDate}
          handleDateClick={handleDateClick}
          records={records}
        />
      </div>
      <DateDetails
        date={inputDate}
        jobs={jobs}
        records={records}
        settings={settings}
      />
    </>
  );
}
