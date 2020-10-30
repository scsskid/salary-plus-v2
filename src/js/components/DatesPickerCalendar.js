import React from 'react';
import Calendar from './Calendar';
import { getShortIsoString, isSameDay } from '../utils/helpers.js';
import Button from './Button';

export default function DatesPickerCalendar({
  inputDate,
  settings,
  isUpdateForm
}) {
  const datesPickerCalendarRef = React.useRef();
  const [state, setState] = React.useState({
    open: false,
    dates: []
  });
  const datesCount = state.dates.length;

  function handleCalendarDateButtonClick(e) {
    const selectedDateObj = new Date(
      e.currentTarget.parentElement.dataset.dateString
    );

    const matchedExisting = state.dates.find((date) => {
      return date.setHours(0, 0, 0, 0) === selectedDateObj.setHours(0, 0, 0, 0);
    });

    if (matchedExisting) {
      // remove existing
      setState({
        ...state,
        dates: state.dates.filter((date) => {
          return (
            date.setHours(0, 0, 0, 0) !== selectedDateObj.setHours(0, 0, 0, 0)
          );
        })
      });
    } else {
      // push new
      // Todo: if is updateForm, dont spread existing dates
      setState({
        ...state,
        dates: [...state.dates, selectedDateObj]
      });
    }
  }

  React.useEffect(() => {
    const allDateCells = document.querySelectorAll('[data-date-string]');

    allDateCells.forEach((cell) => {
      const cellDateObj = new Date(cell.dataset.dateString);
      state.dates.forEach((selectedDate) => {
        if (
          cellDateObj.setHours(0, 0, 0, 0) === selectedDate.setHours(0, 0, 0, 0)
        ) {
          cell.dataset.selected = 'selected';
        }
      });
    });

    // Cleanup
    return () => {
      // Remove previous Visual Selection
      allDateCells.forEach((cell) => {
        cell.dataset.selected = '';
      });
    };
  }, [state, inputDate]);

  return (
    <div className="records-calendar" ref={datesPickerCalendarRef}>
      <p>
        Dates Picker: {isUpdateForm ? `Allow One Date` : `Allow Multiple Dates`}
      </p>
      {datesCount === 1 && <p>{state.dates[0].toLocaleDateString()}</p>}
      {datesCount > 1 && <p>{datesCount} Dates</p>}
      <Button
        onClick={() => {
          setState({ ...state, dates: [] });
        }}
      >
        Clear All Selected
      </Button>

      <Calendar
        inputDate={inputDate}
        settings={settings}
        onCalendarDateButtonClick={handleCalendarDateButtonClick}
      />
    </div>
  );
}
