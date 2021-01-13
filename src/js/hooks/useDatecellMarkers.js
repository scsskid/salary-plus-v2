import * as React from 'react';
import * as helpers from '../utils/helpers';

export default function useDateCellMarkers(
  type = 'today',
  clock = { now: new Date(), today: new Date() },
  inputDate = new Date()
) {
  React.useEffect(() => {
    const allDateCells = Array.from(
      document.getElementsByClassName('calendar-date')
    );

    allDateCells.forEach((cell) => {
      const dateString = cell.dataset.dateString;
      if (
        helpers.isSameDay(
          new Date(dateString),
          type === 'selected' ? inputDate : clock.today
        )
      ) {
        cell.dataset[type] = type;
      }
    });

    return () => {
      allDateCells.forEach((cell) => {
        cell.dataset[type] = '';
      });
    };
  }, [inputDate, clock]);
}
