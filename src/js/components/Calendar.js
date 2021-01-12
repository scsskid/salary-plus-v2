import * as React from 'react';
import DateDetails from './DateDetails.js';
import Month from './Month.js';
import Weekdays from './Weekdays.js';
import useDatecellMarkers from '../hooks/useDatecellMarkers';
import { getAutoOffsetHeight } from '../utils/helpers';
import ScrollToTopOnMount from './ScrollToTopOnMount';

export default function Calendar({
  inputDate = new Date(),
  settings,
  handleDateClick,
  records = [],
  jobs = [],
  clock
}) {
  useDatecellMarkers('selected', clock, inputDate);
  useDatecellMarkers('today', clock, inputDate);
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
          startDate={(() => {
            const inputDateCopy = new Date(inputDate);
            return new Date(inputDateCopy.setDate(1));
          })()}
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
