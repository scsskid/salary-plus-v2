import * as React from 'react';
import Week from './Week';
import { getWeekStartDateOffset } from '../utils/helpers.js';

export default function Month({ inputDate, handleDateClick, records }) {
  const weeks = [];
  const dateWalker = new Date(inputDate.getTime());

  for (let i = 1; i < 42; i = i + 7) {
    const currentDate = new Date(dateWalker.setDate(i));
    const weekStartOffset = getWeekStartDateOffset(currentDate);
    currentDate.setDate(weekStartOffset);
    const isNextMonth =
      (currentDate.getMonth() > inputDate.getMonth() &&
        currentDate.getFullYear() === inputDate.getFullYear()) ||
      currentDate.getFullYear() > inputDate.getFullYear();

    if (isNextMonth) {
      console.log('break');
      break;
    }
    weeks.push(
      <Week
        key={i}
        dateWalker={currentDate}
        inputDate={inputDate}
        handleDateClick={handleDateClick}
        records={records}
        // bleedMonth="true"
      />
    );
  }

  return weeks;
}
