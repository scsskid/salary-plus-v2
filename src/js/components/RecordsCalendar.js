import React from 'react';
import Calendar from './Calendar';
import { useEvents } from '../utils/hooks';

export default function RecordsCalendar({
  inputDate,
  records,
  setInputDate,
  settings
}) {
  function handleCalendarDateButtonClick(e) {
    setInputDate(new Date(e.currentTarget.parentElement.dataset.dateString));
  }

  useEvents({ records, inputDate });

  return (
    <div className="records-calendar">
      <Calendar
        inputDate={inputDate}
        settings={settings}
        onCalendarDateButtonClick={handleCalendarDateButtonClick}
      />
    </div>
  );
}
