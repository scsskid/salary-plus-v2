import * as React from 'react';
import { useEvents } from '../utils/hooks';
import { getShortIsoString, isSameDay } from '../utils/helpers.js';
import { getRecordsByDate, getRecordsByMonth } from '../utils/dataHelpers.js';

export default function DateCell({
  dateString,
  date: dateFigure,
  inputDate,
  setInputDate,
  records
}) {
  const rootEl = React.useRef();
  const cellDateObj = new Date(dateString);

  const matchesInputDate = isSameDay(cellDateObj, inputDate);

  function handleClick(e) {
    setInputDate(new Date(e.currentTarget.parentElement.dataset.dateString));
  }

  const dateRecords = getRecordsByDate({
    records,
    date: cellDateObj
  });

  function onKeyUp() {
    return;
  }

  return (
    <div
      className="calendar-date"
      ref={rootEl}
      data-date-string={dateString}
      data-selected={matchesInputDate ? 'selected' : ''}
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
        {dateRecords.length > 0 && (
          <div data-records>
            {dateRecords.map((record, i) => (
              <DateCellEventIndicator key={i} record={record} />
            ))}
          </div>
        )}
      </button>
    </div>
  );
}

function DateCellEventIndicator({ record }) {
  return (
    <div className="calendar-date-event">
      <small>{record.id} </small>
    </div>
  );
}
