import React from 'react';
import Calendar from './Calendar';
import { getShortIsoString } from '../utils/helpers.js';

export default function RecordsCalendar({
  inputDate,
  records,
  updateInputDate,
  settings
}) {
  const tbody = React.useRef();
  const todayDate = new Date();
  const todayShortString = getShortIsoString(todayDate);

  function handleCalendarDateButtonClick(e) {
    updateInputDate(new Date(e.currentTarget.parentElement.dataset.dateString));
  }

  React.useEffect(() => {
    const allDateCells = document.querySelectorAll('[data-date-string]');
    const todayCell = document.querySelector(
      `[data-date-string="${todayShortString}"]`
    );

    if (todayCell) todayCell.dataset.today = '';
    appendDates({ nodes: allDateCells, records });

    // Cleanup
    return () => {
      tbody.current
        .querySelectorAll('[data-records]')
        .forEach((el) => (el.innerHTML = ``));

      allDateCells.forEach((cell) => cell.removeAttribute('data-today'));
    };
  }, [inputDate]);

  return (
    <div ref={tbody}>
      <Calendar
        settings={settings}
        onCalendarDateButtonClick={handleCalendarDateButtonClick}
      />
    </div>
  );
}

function appendDates({ nodes = [], records = [] }) {
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
