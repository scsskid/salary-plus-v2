import * as React from 'react';
import { useEvents } from '../utils/hooks';
import { getShortIsoString, isSameDay } from '../utils/helpers.js';

export default function DateCell({
  dateString,
  date: dateFigure,
  inputDate,
  setInputDate,
  records
}) {
  const rootEl = React.useRef();
  const cellDateObj = new Date(dateString);
  console.log(cellDateObj, records);
  const matchesInputDate = isSameDay(cellDateObj, inputDate);

  function handleClick(e) {
    setInputDate(new Date(e.currentTarget.parentElement.dataset.dateString));
  }

  function onKeyUp() {
    return;
  }

  return (
    <div
      className="calendar-date"
      ref={rootEl}
      data-date-string={dateString}
      data-selected={matchesInputDate ?? 'selected'}
    >
      <button
        type="button"
        className="calendar-date-button"
        onClick={handleClick}
        onKeyUp={onKeyUp}
      >
        <div className="calendar-date-button-figure">
          <span>{dateFigure}</span>
        </div>
        <div data-records></div>
      </button>
    </div>
  );
}
