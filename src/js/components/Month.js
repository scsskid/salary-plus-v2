import * as React from 'react';
import Week from './Week';
import { getWeekStartDateOffset } from '../utils/helpers.js';

export default function Month({ inputDate, handleDateClick, records }) {
  const weeks = [];
  const dateWalker = new Date(inputDate.getTime());

  for (let i = 1; i < 42; i = i + 7) {
    const currentDate = new Date(dateWalker.setDate(i));
    const weekStartOffset = getWeekStartDateOffset(currentDate);
    const isNextMonth =
      currentDate.getMonth() > inputDate.getMonth() &&
      currentDate.getFullYear() === inputDate.getFullYear();

    currentDate.setDate(weekStartOffset);

    if (isNextMonth) {
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
