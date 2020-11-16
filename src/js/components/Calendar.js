import * as React from 'react';
import DateDetails from './DateDetails.js';
import Month from './Month.js';
import Weekdays from './Weekdays.js';
import WidgetInputDate from './WidgetInputDate.js';
import * as helpers from '../utils/helpers.js';

export default function Calendar({
  inputDate = new Date(),
  handleDateClick,
  settings,
  records = [],
  changeMonth,
  jobs = [],
  clock
}) {
  React.useEffect(() => {
    const allDateCells = Array.from(
      document.getElementsByClassName('calendar-date')
    );

    allDateCells.forEach((cell) => {
      const dateString = cell.dataset.dateString;

      if (helpers.isSameDay(new Date(dateString), inputDate)) {
        cell.dataset.selected = 'selected';
      }

      if (helpers.isSameDay(new Date(dateString), clock.today)) {
        cell.dataset.today = 'today';
      }
    });

    return () => {
      allDateCells.forEach((cell) => {
        cell.dataset.selected = '';
        cell.dataset.today = '';
      });
    };
  }, [inputDate]);

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
