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
  const weeks = [];
  const requestedMonthIndex = startDate.getMonth();
  const requestedYear = startDate.getFullYear();
  const calendarStartDate = getWeekStartDate(startDate);

  for (let i = 0; i < 42; i = i + 7) {
    const requestedDate = new Date(
      calendarStartDate.getTime() + i * 60 * 60 * 24 * 1000
    );

    const isNextMonth =
      (requestedDate.getMonth() > requestedMonthIndex &&
        requestedDate.getFullYear() === requestedYear) ||
      requestedDate.getFullYear() > requestedYear;

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
        requestedMonthIndex={requestedMonthIndex}
        bleedMonth={false}
      />
    );
  }

  return weeks;
}
