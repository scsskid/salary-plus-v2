import * as React from 'react';
import Button from './Button';
// eslint-disable-next-line no-unused-vars
import { getWeekStartDateOffset } from '../utils/helpers';

export default function WidgetInputDate({
  type = 'month',
  inputDate,
  settings,
  changeMonth,
  changeDate
}) {
  const date = new Date(inputDate.getTime());
  // date.setDate(getWeekStartDateOffset(inputDate));

  const display = {
    month: date.toLocaleDateString(undefined, {
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
    today: () => changeMonth(-1),
    month: {
      prev: () => changeMonth(-1),
      next: () => changeMonth(-1)
    },
    week: {
      prev: () => changeDate(-7),
      next: () => changeDate(7)
    }
  };

  return (
    <div className="input-date-display-control">
      {/* {inputDate.toLocaleDateString()} */}
      <div className="input-date-display">{display[type]}</div>

      <div className="input-date-control">
        <Button onClick={handlers[type].prev}>Prev</Button>{' '}
        <Button onClick={handlers['month'].today}>Today</Button>{' '}
        <Button onClick={handlers[type].next}>Next</Button>
      </div>
    </div>
  );
}
