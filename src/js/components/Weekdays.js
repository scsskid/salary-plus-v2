import * as React from 'react';
import { getWeekDayNames } from '../utils/helpers.js';

export default function Weekdays({ dayStart, settings }) {
  let cells = [];
  for (let i = 0; i < 7; i++) {
    const name = getWeekDayNames({
      dayStart,
      format: 'short',
      locale: settings.locale
    })[i];

    cells.push(
      <div key={`weekday-headcell-${i}`} data-day={name.toLowerCase()}>
        {name}
      </div>
    );
  }

  return <div className="calendar-weekdays">{cells}</div>;
}
