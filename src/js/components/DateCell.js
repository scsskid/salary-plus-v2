import * as React from 'react';
import { useEvents } from '../utils/hooks';

export default function DateCell({
  dateString,
  date,
  onCalendarDateButtonClick,
  records
}) {
  const rootEl = React.useRef();

  function onKeyUp() {
    return;
  }

  return (
    <div className="calendar-date" ref={rootEl} data-date-string={dateString}>
      <button
        type="button"
        className="calendar-date-button"
        onClick={onCalendarDateButtonClick}
        onKeyUp={onKeyUp}
      >
        <div className="calendar-date-button-figure">
          <span>{date}</span>
        </div>
        <div data-records></div>
      </button>
    </div>
  );
}
