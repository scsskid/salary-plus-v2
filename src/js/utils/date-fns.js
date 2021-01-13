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

export function getMonthStartDate(input) {
  const dt = new Date(input);
  dt.setHours(0, 0, 0, 0);
  return new Date(dt.setDate(1));
}

export function getWeekStartDate(dateObj, firstDayOfWeekIndex = 1) {
  const dayOfWeek = dateObj.getDay();
  const firstDayOfWeek = new Date(dateObj);
  const diff =
    dayOfWeek >= firstDayOfWeekIndex
      ? dayOfWeek - firstDayOfWeekIndex
      : 6 - dayOfWeek;

  firstDayOfWeek.setDate(dateObj.getDate() - diff);
  firstDayOfWeek.setHours(0, 0, 0, 0);

  return firstDayOfWeek;
}
