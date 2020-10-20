import React from 'react';
import { getWeekDayNames } from '../utils/helpers.js';

export default function CalendarHead({ settings }) {
  let cells = [];
  for (let i = 0; i < 7; i++) {
    cells.push(
      <td key={`weekday-headcell-${i}`}>
        {getWeekDayNames({ format: 'short', locale: settings.locale })[i]}
      </td>
    );
  }

  return (
    <thead>
      <tr>{cells}</tr>
    </thead>
  );
}
