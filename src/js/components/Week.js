import * as React from 'react';
import { getShortIsoString, isSameMonth } from '../utils/helpers.js';
import DateCell from './DateCell.js';
import { useEvents, useWeekEvents } from '../utils/hooks';

export default function Week({
  inputDate,
  dateWalker = inputDate,
  bleedMonth = false,
  records,
  onCalendarDateButtonClick = () => {
    return;
  }
}) {
  const cells = [];
  useWeekEvents({ records, inputDate });
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
          dateString={getShortIsoString(dateWalker)}
          date={dateWalker.getDate()}
          onCalendarDateButtonClick={onCalendarDateButtonClick}
          inputDate={inputDate}
          records={records}
        />
      );
    }
    dateWalker.setDate(dateWalker.getDate() + 1);
  }

  return <div className="week-row calendar-week">{cells}</div>;
}
