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
  const endDate = new Date(startDate).setDate(startDate.getDate() + 7);

  // React.useEffect(() => {
  //   console.log(startDate);
  //   console.log(new Date(endDate));
  //   console.log('---');
  // }, []);

  const cells = [];
  for (const d = new Date(startDate); d < endDate; d.setDate(d.getDate() + 1)) {
    cells.push(
      <DateCell
        key={d}
        date={new Date(d)}
        handleDateClick={handleDateClick}
        records={records}
        jobs={jobs}
      />
    );

    // dateWalker.setDate(dateWalker.getDate() + 1);
  }

  return <div className="week-row calendar-week">{cells}</div>;
}
