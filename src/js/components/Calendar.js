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
  setInputDate,
  changeMonth,
  changeDate,
  jobs = { jobs },
  children
}) {
  return (
    <>
      {children}
      <div className="view-calendar-controls">
        <WidgetInputDate
          inputDate={inputDate}
          settings={settings}
          changeMonth={changeMonth}
          setInputDate={setInputDate}
          // type={state.activeSegement.toLowerCase()}
          changeDate={changeDate}
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
