import * as React from 'react';
import Button from './Button';
import Weekdays from './Weekdays';
import Month from './Month';
import WidgetInputDate from './WidgetInputDate';
import useDatecellMarkers from '../hooks/useDatecellMarkers';
import { getAutoOffsetHeight } from '../utils/helpers';

export default function DatesPickerCalendar({
  inputDate,
  clock,
  dates = [],
  updateDates,
  settings,
  isUpdateForm,
  changeMonth,
  datePickerOpen,
  records
}) {
  const [allowMultipleDates, setAllowMultipleDates] = React.useState(false);
  const datesCount = dates.length;

  useDatecellMarkers('today', clock, inputDate);

  React.useEffect(() => {
    const datePickerDom = document.querySelector('.dates-picker-calendar');
    datePickerDom.style.height = datePickerOpen
      ? getAutoOffsetHeight(datePickerDom) + 'px'
      : 0 + 'px';
  }, [datePickerOpen, inputDate]);

  function handleChange(e) {
    const { checked } = e.target;
    setAllowMultipleDates(checked);
  }

  function handleDateClick(e) {
    const selectedDateObj = new Date(
      e.currentTarget.parentElement.dataset.dateString
    );

    const matchedExisting = dates.find((date) => {
      return date.setHours(0, 0, 0, 0) === selectedDateObj.setHours(0, 0, 0, 0);
    });

    if (matchedExisting && allowMultipleDates) {
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
        isUpdateForm || !allowMultipleDates
          ? [selectedDateObj]
          : [...dates, selectedDateObj]
      );
    }
  }

  React.useEffect(() => {
    const allDateCells = Array.from(
      document.getElementsByClassName('calendar-date')
    );

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
    >
      <div className="dates-picker-calendar-inner">
        {datesCount > 0 &&
          allowMultipleDates &&
          {
            /* <Button
          onClick={() => {
            updateDates([]);
          }}
        >
          Clear All Selected
        </Button> */
          }}
        {!isUpdateForm && (
          <label>
            Select multiple{' '}
            <input
              type="checkbox"
              id="allowMultiple"
              name="allowMultiple"
              onChange={handleChange}
              checked={allowMultipleDates}
            />
          </label>
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
          records={records}
        />
      </div>
    </div>
  );
}
