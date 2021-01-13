import * as React from 'react';
import { getWeekDayNames } from '../utils/helpers.js';

export default function Weekdays({ firstDayOfWeekIndex = 1, settings }) {
  let cells = [];
  for (let i = 0; i < 7; i++) {
    const weekdayName = getWeekDayNames({
      firstDayOfWeekIndex,
      format: 'short',
      locale: settings.language
    })[i];

    // todo: data name must bne english
    cells.push(
      <div
        key={`weekday-headcell-${i}`}
        data-day={weekdayName.english.toLowerCase()}
      >
        {weekdayName.localized}
      </div>
    );
  }

  return <div className="calendar-weekdays">{cells}</div>;
}
