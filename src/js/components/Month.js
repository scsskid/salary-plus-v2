import * as React from 'react';
import Week from './Week';
import { getWeekStartDateOffset } from '../utils/helpers.js';

export default function Month({
  inputDate,
  daysInMonth,
  firstDay,
  onCalendarDateButtonClick
}) {
  const weeks = [];
  const dateWalker = new Date(inputDate.getTime());

  for (let i = 1; i < 42; i = i + 7) {
    const currentDate = new Date(dateWalker.setDate(i));
    const weekStartOffset = getWeekStartDateOffset(currentDate);
    currentDate.setDate(weekStartOffset);
    if (currentDate.getMonth() > inputDate.getMonth()) {
      break;
    }
    weeks.push(
      <Week
        key={i}
        daysInMonth={daysInMonth}
        firstDay={firstDay}
        dateWalker={currentDate}
        inputDate={inputDate}
        onCalendarDateButtonClick={onCalendarDateButtonClick}
      />
    );
  }

  return weeks;
}