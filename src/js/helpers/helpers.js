export function ISODateString(d) {
  return (
    d.getUTCFullYear() +
    '-' +
    pad(d.getUTCMonth() + 1) +
    '-' +
    pad(d.getUTCDate()) +
    'T' +
    pad(d.getUTCHours()) +
    ':' +
    pad(d.getUTCMinutes()) +
    ':' +
    pad(d.getUTCSeconds()) +
    'Z'
  );
}

export function pad(n) {
  return n < 10 ? '0' + n : n;
}

export function getDayName(i) {
  return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i];
}

// Get First (Week-)Day, Adjusted for On Monday Starting Week
export function getFirstDay(date) {
  let tempDate = new Date(date.getTime());
  tempDate.setDate(1);
  return (tempDate.getDay() + 6) % 7;
}
