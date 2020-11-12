import * as React from 'react';
import { isSameMonth } from '../utils/helpers.js';
import DateCell from './DateCell.js';

export default function Week({
  inputDate = new Date(),
  dateWalker = inputDate,
  bleedMonth = false,
  records = [],
  handleDateClick = () => {}
}) {
  const cells = [];
  // bleedMonth = true;

  for (let i = 0; i < 7; i++) {
    if (!bleedMonth && !isSameMonth(dateWalker, inputDate)) {
      cells.push(
        <div
          className="calendar-date calendar-date--empty"
          key={`weekday-bodycell-${i}`}
        ></div>
      );
    } else {
      cells.push(
        <DateCell
          key={i}
          date={new Date(dateWalker.getTime())}
          handleDateClick={handleDateClick}
          inputDate={inputDate}
          records={records}
        />
      );
    }
    dateWalker.setDate(dateWalker.getDate() + 1);
  }

  return <div className="week-row calendar-week">{cells}</div>;
}
