import * as React from 'react';
import { getShortIsoString, isSameDay } from '../utils/helpers.js';

function useEvents({ records, inputDate }) {
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
      document
        .querySelectorAll('[data-records]')
        .forEach((el) => (el.innerHTML = ''));
    };
  }, [inputDate]);
}

export { useEvents };

// Todo: Refactor
function appendRecords({ nodes = [], records = [] }) {
  nodes.forEach((cell) => {
    records.filter((record) => {
      const isMatch =
        getShortIsoString(new Date(record.begin)) == cell.dataset.dateString
          ? record
          : false;

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
