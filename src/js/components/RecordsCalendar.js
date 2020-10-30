import React from 'react';
import Calendar from './Calendar';
import { getShortIsoString, isSameDay } from '../utils/helpers.js';

export default function RecordsCalendar({
  inputDate,
  records,
  updateInputDate,
  settings
}) {
  const recordsCalendarRef = React.useRef();

  function handleCalendarDateButtonClick(e) {
    updateInputDate(new Date(e.currentTarget.parentElement.dataset.dateString));
  }

  React.useEffect(() => {
    // Apend Records
    const allDateCells = document.querySelectorAll('[data-date-string]');
    appendRecords({ nodes: allDateCells, records });

    // Auto Mark Selected
    allDateCells.forEach((cell) => {
      const cellDateObj = new Date(cell.dataset.dateString);
      // console.log(cellDateObj);
      cell.dataset.selected = isSameDay(cellDateObj, inputDate)
        ? 'selected'
        : '';
    });

    // Cleanup
    return () => {
      recordsCalendarRef.current
        .querySelectorAll('[data-records]')
        .forEach((el) => (el.innerHTML = ``));
    };
  }, [inputDate]);

  return (
    <div className="records-calendar" ref={recordsCalendarRef}>
      <Calendar
        inputDate={inputDate}
        settings={settings}
        onCalendarDateButtonClick={handleCalendarDateButtonClick}
      />
    </div>
  );
}

function appendRecords({ nodes = [], records = [] }) {
  nodes.forEach((cell) => {
    records.filter((record) => {
      const isMatch =
        getShortIsoString(new Date(record.begin)) == cell.dataset.dateString
          ? record
          : null;

      if (isMatch) {
        cell
          .querySelector('[data-records]')
          .insertAdjacentHTML(
            'beforeend',
            `<div class="calendar-date-event"><small>${record.id}</span></div>`
          );
      }
    });
  });
}
