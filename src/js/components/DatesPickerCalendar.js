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
  function handleCalendarDateButtonClick(e) {
    const selectedDateObj = new Date(
      e.currentTarget.parentElement.dataset.dateString
    );
    // if is already in selected -> remove
    const matchedExisting = state.dates.find((date) => {
      // return isSameDay(date, selectedDateObj);
      return date.setHours(0, 0, 0, 0) === selectedDateObj.setHours(0, 0, 0, 0);
    });

    console.log(matchedExisting);

    if (matchedExisting) {
      // return;
      setState({
        ...state,
        dates: state.dates.filter((date) => {
          return (
            date.setHours(0, 0, 0, 0) !== selectedDateObj.setHours(0, 0, 0, 0)
          );
        })
      });
    } else {
      // Todo: if is updateForm, dont spread existing dates
      setState({
        ...state,
        dates: [...state.dates, selectedDateObj]
      });
    }
    console.log('finished handleClick');
  }

  React.useEffect(() => {
    console.log('Begin Effect', state);
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
  }, [state]);

  return (
    <div className="records-calendar" ref={datesPickerCalendarRef}>
      <p>
        Dates Picker: {isUpdateForm ? `Allow One Date` : `Allow Multiple Dates`}
      </p>
      <Button
        onClick={() => {
          setState({ ...state, dates: [] });
        }}
      >
        Clear All Selected
      </Button>
      {state.dates.map((date, i) => (
        <p key={i}>{date.toLocaleDateString()}</p>
      ))}
      <Calendar
        inputDate={inputDate}
        settings={settings}
        onCalendarDateButtonClick={handleCalendarDateButtonClick}
      />
    </div>
  );
}
