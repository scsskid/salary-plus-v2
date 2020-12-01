import * as React from 'react';
import DateDetails from './DateDetails.js';
import Month from './Month.js';
import Weekdays from './Weekdays.js';
import WidgetInputDate from './WidgetInputDate.js';
import useDatecellMarkers from '../hooks/useDatecellMarkers';
import { getAutoOffsetHeight } from '../utils/helpers';
import ScrollToTopOnMount from './ScrollToTopOnMount';

export default function Calendar({
  inputDate = new Date(),
  handleDateClick,
  settings,
  records = [],
  changeMonth,
  jobs = [],
  clock
}) {
  useDatecellMarkers('selected', clock, inputDate);
  useDatecellMarkers('today', clock, inputDate);
  ScrollToTopOnMount();

  React.useEffect(() => {
    const datePickerDom = document.querySelector('.calendar-body');
    datePickerDom.style.height = getAutoOffsetHeight(datePickerDom) + 'px';
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
          jobs={jobs}
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
