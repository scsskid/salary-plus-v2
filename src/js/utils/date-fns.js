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
  return new Date(dt.setDate(1));
}

export function getWeekStartDateOffset(angleDate, weekStartsOn = 'monday') {
  const date = angleDate.getDate();
  const day = angleDate.getDay();
  const startDate = weekStartsOn === 'monday' ? date - day + 1 : date - day;
  return startDate <= date ? startDate : startDate - 7; // set walkerInput to -7 days if value not in the past
}

export function getWeekStartDate(inputDate, weekStartsOn = 'monday') {
  const currentDate = new Date(inputDate.getTime());
  const weekStartOffset = getWeekStartDateOffset(currentDate, weekStartsOn);
  currentDate.setDate(weekStartOffset);

  return currentDate;
}
