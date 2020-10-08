import React from 'react';
import { getDayName } from '../utils/helpers.js';

function CalendarHead() {
  let cells = [];
  for (let i = 0; i < 7; i++) {
    cells.push(<td key={`weekday-headcell-${i}`}>{getDayName(i)}</td>);
  }

  return (
    <thead>
      <tr>{cells}</tr>
    </thead>
  );
}

export default CalendarHead;
