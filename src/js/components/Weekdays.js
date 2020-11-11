import * as React from 'react';
import { getWeekDayNames } from '../utils/helpers.js';

export default function Weekdays({ settings }) {
  let cells = [];
  for (let i = 0; i < 7; i++) {
    cells.push(
      <div key={`weekday-headcell-${i}`}>
        {getWeekDayNames({ format: 'short', locale: settings.locale })[i]}
      </div>
    );
  }

  return <div className="calendar-weekdays">{cells}</div>;
}
