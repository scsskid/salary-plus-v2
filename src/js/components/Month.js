import * as React from 'react';
import Week from './Week';
import { getWeekStartDateOffset, getWeekStartDate } from '../utils/date-fns.js';

export default function Month({ startDate, handleDateClick, records, jobs }) {
  // Gets always date 1 as startDate

  const weeks = [];
  const requestedMonth = startDate.getMonth();
  const requestedYear = startDate.getFullYear();
  const dateWalker = new Date(startDate.getTime());
  const xy1Date = getWeekStartDate(startDate);
  // dateWalker.setDate(weekStartOffset);

  React.useEffect(() => {
    // console.log(requestedMonth, xy1Date);
    console.log(getWeekStartDateOffset(new Date('2021-01-12')));
    console.log(getWeekStartDateOffset(new Date('2021-12-1')));
    console.log(getWeekStartDateOffset(new Date('2021-01-31')));
  }, [startDate]);

  for (let i = 0; i < 42; i = i + 7) {
    const requestedDate = new Date(xy1Date.getTime() + i * 60 * 60 * 24 * 1000);
    // console.log(requestedDate);
    const isPrevMonth =
      (dateWalker.getMonth() < requestedMonth &&
        dateWalker.getFullYear() === requestedYear) ||
      dateWalker.getFullYear() < requestedYear;

    const isNextMonth =
      (dateWalker.getMonth() > requestedMonth &&
        dateWalker.getFullYear() === requestedYear) ||
      dateWalker.getFullYear() > requestedYear;

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
