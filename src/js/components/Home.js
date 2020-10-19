import React from 'react';
import Calendar from './Calendar';
import ListView from './ListView';
import { getRecordsByDate, getRecordsByMonth } from '../utils/dataHelpers.js';
import { getDaysInMonth, getFirstDay } from '../utils/helpers.js';
import InputDateControl from './InputDateControl';
import Button from './Button';

export default function Home({
  inputDate,
  changeMonth,
  updateInputDate,
  records,
  jobs,
  settings
}) {
  const monthRecords = getRecordsByMonth({
    records,
    date: inputDate
  });

  // console.log(monthRecords);

  const dateRecords = getRecordsByDate({
    records: monthRecords,
    date: inputDate
  });

  const firstDay = getFirstDay(inputDate);

  const daysInMonth = getDaysInMonth(inputDate);

  return (
    <>
      <InputDateControl
        inputDate={inputDate}
        changeMonth={changeMonth}
        settings={settings}
      />
      <div>
        <Button onClick={() => {}}>Calendar</Button>{' '}
        <Button onClick={() => {}}>List</Button>
      </div>
      <Calendar
        inputDate={inputDate}
        updateInputDate={updateInputDate}
        records={records}
        jobs={jobs}
        settings={settings}
        monthRecords={monthRecords}
        dateRecords={dateRecords}
        daysInMonth={daysInMonth}
        firstDay={firstDay}
      />
      <ListView
        jobs={jobs}
        settings={settings}
        inputDate={inputDate}
        monthRecords={monthRecords}
        dateRecords={dateRecords}
        daysInMonth={daysInMonth}
        firstDay={firstDay}
        updateInputDate={updateInputDate}
      />
    </>
  );
}
