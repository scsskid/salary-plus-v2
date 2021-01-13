import * as React from 'react';
import DateDetails from './DateDetails.js';
import Month from './Month.js';
import Weekdays from './Weekdays.js';
import useDateCellMarkers from '../hooks/useDateCellMarkers';
import { getAutoOffsetHeight } from '../utils/helpers';
import ScrollToTopOnMount from './ScrollToTopOnMount';
import { getMonthStartDate } from '../utils/date-fns.js';

export default function Calendar({
  inputDate = new Date(),
  settings,
  handleDateClick,
  records = [],
  jobs = [],
  clock
}) {
  useDateCellMarkers('selected', clock, inputDate);
  useDateCellMarkers('today', clock, inputDate);
  ScrollToTopOnMount();

  React.useEffect(() => {
    // console.log(inputDate);
    const datePickerDom = document.querySelector('.calendar-body');
    datePickerDom.style.height = getAutoOffsetHeight(datePickerDom) + 'px';
  }, [inputDate]);

  return (
    <>
      <div className="calendar-body">
        <Weekdays settings={settings} />
        <Month
          startDate={(() => getMonthStartDate(inputDate))()}
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
