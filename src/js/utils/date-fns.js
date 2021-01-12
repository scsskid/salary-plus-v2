export function getTimeElapsed(duration) {
  // let milliseconds = parseInt((duration % 1000) / 100)
  let seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  return `${hours}:${minutes}`;
}

export function timeToDecimal(t) {
  let arr = t.split(':');
  let dec = parseInt((arr[1] / 6) * 10, 10);

  return parseFloat(parseInt(arr[0], 10) + '.' + (dec < 10 ? '0' : '') + dec);
}

export function deltaDate(input, amount, dateType) {
  const dt = new Date(input);
  switch (dateType) {
    case 'days':
      return dt.setDate(dt.getDate() + amount) && dt;
    case 'weeks':
      return dt.setDate(dt.getDate() + 7 * amount) && dt;
    case 'months':
      return dt.setMonth(dt.getMonth() + amount) && dt;
    case 'years':
      return dt.setFullYear(dt.getFullYear() + amount) && dt;
  }
}

export function getFirstDateOfMonthDate(input) {
  const dt = new Date(input);
  dt.setHours(0, 0, 0, 0);
  return new Date(dt.setDate(1));
}

export function getWeekStartDateOffset(angleDate) {
  const date = angleDate.getDate();
  const day = angleDate.getDay();
  const dateMinusDay = date - day;

  return dateMinusDay;
}

export function getWeekStartDate(angleDate) {
  const weekStartDate = new Date(angleDate.getTime());

  const weekStartOffset = getWeekStartDateOffset(weekStartDate);

  weekStartDate.setTime(
    weekStartDate.getTime() + weekStartOffset * 60 * 60 * 1000 * 24
  );

  return weekStartDate;
}
