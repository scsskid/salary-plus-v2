import * as React from 'react';
import Button from './Button';

export default function WidgetInputDate({
  inputDate,
  settings,
  changeMonth,
  changeDate
}) {
  const date = new Date(inputDate.getTime());

  const display = {
    dashboard: date.toLocaleDateString(settings.language, {
      month: 'long',
      year: 'numeric'
    }),
    week: (function () {
      let string = date.toLocaleDateString(settings.language, {
        month: 'short',
        day: 'numeric'
      });
      date.setDate(date.getDate() + 6);
      string += ' - ';
      string += date.toLocaleDateString(settings.language, {
        month: 'short',
        day: 'numeric'
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
      <div className="input-date-display">{display['dashboard']}</div>

      <div className="input-date-control">
        <Button onClick={handlers['dashboard']?.prev}>◀</Button>{' '}
        <Button onClick={handlers.today}>Today</Button>{' '}
        <Button onClick={handlers['dashboard']?.next}>▶</Button>
      </div>
    </div>
  );
}
