import * as React from 'react';
import Button from './Button';
// eslint-disable-next-line no-unused-vars
import { getWeekStartDateOffset } from '../utils/helpers';

export default function WidgetInputDate({
  inputDate,
  settings,
  changeMonth,
  changeDate
}) {
  const date = new Date(inputDate.getTime());

  const display = {
    dashboard: date.toLocaleDateString(undefined, {
      month: 'long',
      year: 'numeric',
      timeZone: settings.timeZone
    }),
    week: (function () {
      let string = date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        timeZone: settings.timeZone
      });
      date.setDate(date.getDate() + 6);
      string += ' - ';
      string += date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        timeZone: settings.timeZone
      });
      return string;
    })()
  };
  const handlers = {
    today: () => changeMonth(0),
    dashboard: {
      prev: () => changeMonth(-1),
      next: () => changeMonth(1)
    },
    week: {
      prev: () => changeDate(-7),
      next: () => changeDate(7)
    }
  };

  return (
    <div className="input-date-display-control">
      {/* {inputDate.toLocaleDateString()} */}
      <div className="input-date-display">{display['dashboard']}</div>

      <div className="input-date-control">
        <Button onClick={handlers['dashboard']?.prev}>◀</Button>{' '}
        <Button onClick={handlers.today}>Today</Button>{' '}
        <Button onClick={handlers['dashboard']?.next}>▶</Button>
      </div>
    </div>
  );
}
