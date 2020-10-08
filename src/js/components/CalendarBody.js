import React from 'react';
import {
  getFirstDay,
  getDaysInMonth,
  getShortIsoString
} from '../helpers/helpers.js';

function CalendarBody({ inputDate }) {
  const firstDay = getFirstDay(inputDate);
  const daysInMonth = getDaysInMonth(inputDate);
  const currentDate = new Date();
  let date = 1;
  let rows = [];

  React.useEffect(() => {
    console.log('effect');
  });

  for (let i = 0; i < 6; i++) {
    let cells = [];
    if (date >= daysInMonth) {
      break;
    }
    for (let j = 0; j < 7; j++) {
      const isLeadingCell = i === 0 && j < firstDay;
      const isTrailingCell = date > daysInMonth;

      if (isLeadingCell || isTrailingCell) {
        cells.push(<td key={`weekday-bodycell-${j}`}></td>);
      } else {
        currentDate.setDate(date);
        cells.push(
          <td
            data-date-string={getShortIsoString(currentDate)}
            key={`weekday-bodycell-${j}`}
          >
            {date}
          </td>
        );
        date++;
      }
    }

    rows.push(<tr key={`weekday-bodyrow-${i}`}>{cells}</tr>);
  }
  return <tbody>{rows}</tbody>;
}

export default CalendarBody;
