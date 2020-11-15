import React from 'react';
import Button from './Button';
import Weekdays from './Weekdays';
import Month from './Month';
import WidgetInputDate from './WidgetInputDate';

export default function DatesPickerCalendar({
  inputDate,
  dates = [],
  updateDates,
  settings,
  isUpdateForm,
  changeMonth,
  datePickerOpen,
  setInputDate
}) {
  const datesPickerCalendarRef = React.useRef();
  const datesCount = dates.length;

  function handleDateClick(e) {
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
      <div className="view-calendar-controls">
        <WidgetInputDate
          inputDate={inputDate}
          settings={settings}
          changeMonth={changeMonth}
        />
      </div>
      <Weekdays settings={settings} />
      <Month
        inputDate={inputDate}
        handleDateClick={handleDateClick}
        // records={records}
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
