import React from 'react';
import { getWeekDayNames } from '../utils/helpers.js';

export default function CalendarHead({ settings }) {
  let cells = [];
  for (let i = 0; i < 7; i++) {
    cells.push(
      <span key={`weekday-headcell-${i}`}>
        {getWeekDayNames({ format: 'short', locale: settings.locale })[i]}
      </span>
    );
  }

  return (
    <div>
      <div>{cells}</div>
    </div>
  );
}
