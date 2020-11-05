import React from 'react';
import Calendar from './Calendar';
import Button from './Button';
import InputDateControl from './InputDateControl';
import InputDateDisplay from './InputDateDisplay';

export default function DatesPickerCalendar({
  inputDate,
  dates = [],
  updateDates,
  settings,
  isUpdateForm,
  changeMonth,
  datePickerOpen
}) {
  const datesPickerCalendarRef = React.useRef();
  const datesCount = dates.length;

  function handleCalendarDateButtonClick(e) {
    const selectedDateObj = new Date(
      e.currentTarget.parentElement.dataset.dateString
    );

    const matchedExisting = dates.find((date) => {
      return date.setHours(0, 0, 0, 0) === selectedDateObj.setHours(0, 0, 0, 0);
    });

    if (matchedExisting && !isUpdateForm) {
      // Create Form:
      // remove existing

      updateDates(
        dates.filter((date) => {
          return (
            date.setHours(0, 0, 0, 0) !== selectedDateObj.setHours(0, 0, 0, 0)
          );
        })
      );
    } else {
      // Update Form:
      // push new
      updateDates(
        isUpdateForm ? [selectedDateObj] : [...dates, selectedDateObj]
      );
    }
  }

  React.useEffect(() => {
    const allDateCells = document.querySelectorAll('[data-date-string]');

    allDateCells.forEach((cell) => {
      const cellDateObj = new Date(cell.dataset.dateString);
      dates.forEach((selectedDate) => {
        if (
          cellDateObj.setHours(0, 0, 0, 0) === selectedDate.setHours(0, 0, 0, 0)
        ) {
          cell.dataset.selected = 'selected';
        }
      });
    });

    // Cleanup
    return () => {
      allDateCells.forEach((cell) => {
        cell.dataset.selected = '';
      });
    };
  }, [dates, inputDate]);

  return (
    <div
      className={
        datePickerOpen
          ? 'dates-picker-calendar dates-picker-calendar--is-open'
          : 'dates-picker-calendar'
      }
      ref={datesPickerCalendarRef}
    >
      {datesCount > 0 && !isUpdateForm && (
        <Button
          onClick={() => {
            updateDates([]);
          }}
        >
          Clear All Selected
        </Button>
      )}
      <InputDateControl changeMonth={changeMonth} />
      <InputDateDisplay inputDate={inputDate} settings={settings} />
      <Calendar
        inputDate={inputDate}
        settings={settings}
        onCalendarDateButtonClick={handleCalendarDateButtonClick}
      />
      {!isUpdateForm && (
        <p>
          <small>
            Select <b>one or more</b> dates
          </small>
        </p>
      )}
    </div>
  );
}
