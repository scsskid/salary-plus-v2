import * as React from 'react';
import { isSameMonth } from '../utils/helpers.js';
import DateCell from './DateCell.js';

export default function Week({
  startDate = new Date('1982/10/04'),
  bleedMonth = false,
  records = [],
  jobs,
  handleDateClick = () => {
    console.warn('no handler for dateClick');
  }
}) {
  const dateWalker = new Date(startDate.getTime());

  React.useEffect(() => {
    // console.log(startDate);
  }, []);

  const cells = [];
  for (let i = 0; i < 7; i++) {
    cells.push(
      <DateCell
        key={i}
        date={new Date(dateWalker.getTime())}
        handleDateClick={handleDateClick}
        records={records}
        jobs={jobs}
      />
    );

    dateWalker.setDate(dateWalker.getDate() + 1);
  }

  return <div className="week-row calendar-week">{cells}</div>;
}
