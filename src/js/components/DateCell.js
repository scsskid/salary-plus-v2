import * as React from 'react';

export default function DateCell({
  dateString,
  date,
  onCalendarDateButtonClick
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
