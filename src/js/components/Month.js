import * as React from 'react';
import Week from './Week';
import { getWeekStartDate } from '../utils/date-fns.js';

export default function Month({
  startDate = new Date(),
  handleDateClick = () => {
    console.warn('no handler defined');
  },
  records = [],
  jobs = []
}) {
  // Gets always date 1 as startDate

  const weeks = [];
  const requestedMonth = startDate.getMonth();
  const requestedYear = startDate.getFullYear();
  const calendarStartDate = getWeekStartDate(startDate);

  React.useEffect(() => {
    console.log(startDate, requestedMonth, calendarStartDate);
  }, [startDate]);

  for (let i = 0; i < 42; i = i + 7) {
    const requestedDate = new Date(
      calendarStartDate.getTime() + i * 60 * 60 * 24 * 1000
    );
    // console.log(requestedDate);
    const isPrevMonth =
      (requestedDate.getMonth() < requestedMonth &&
        requestedDate.getFullYear() === requestedYear) ||
      requestedDate.getFullYear() < requestedYear;

    const isNextMonth =
      (requestedDate.getMonth() > requestedMonth &&
        requestedDate.getFullYear() === requestedYear) ||
      requestedDate.getFullYear() > requestedYear;

    // console.log(dateWalker, startDate);

    if (isNextMonth) {
      break;
    }
    weeks.push(
      <Week
        key={i}
        startDate={requestedDate}
        handleDateClick={handleDateClick}
        records={records}
        jobs={jobs}
      />
    );
  }

  return weeks;
}
