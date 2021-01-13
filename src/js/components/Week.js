import * as React from 'react';
import DateCell from './DateCell.js';

export default function Week({
  startDate = new Date('1982/10/04'),
  records = [],
  jobs,
  handleDateClick = () => {
    console.warn('no handler for dateClick');
  },
  requestedMonthIndex,
  bleedMonth = false
}) {
  const endDate = new Date(startDate).setDate(startDate.getDate() + 7);

  const cells = [];
  for (const d = new Date(startDate); d < endDate; d.setDate(d.getDate() + 1)) {
    const isBleedDate = d.getMonth() !== requestedMonthIndex;

    if (isBleedDate && bleedMonth === false) {
      cells.push(
        <div key={d} className="calendar-date calendar-date--empty"></div>
      );
    } else {
      cells.push(
        <DateCell
          key={d}
          date={new Date(d)}
          handleDateClick={handleDateClick}
          records={records}
          jobs={jobs}
          isBleedDate={isBleedDate}
        />
      );
    }
  }

  return <div className="week-row calendar-week">{cells}</div>;
}
