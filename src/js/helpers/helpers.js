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

export function getDaysInMonth(date) {
  return 32 - new Date(date.getFullYear(), date.getMonth(), 32).getDate();
}

export function getShortIsoString(date) {
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - offset * 60 * 1000);
  return date.toISOString().split('T')[0];
}

export function logMonthSpecs(inputDate) {
  console.log(`
  first Day of this month (${pad(
    inputDate.getMonth() + 1
  )}) starts on a ${getDayName(getFirstDay(inputDate))}
  (${getFirstDay(inputDate)})

  Month has ${getDaysInMonth(inputDate)} Dates
`);
}

export function shiftRecordsDates({ data, summand }) {
  const shiftMonths = (record) => {
    const beginCopy = new Date(record.begin);
    const endCopy = new Date(record.end);

    beginCopy.setMonth(beginCopy.getMonth() + summand);
    endCopy.setMonth(endCopy.getMonth() + summand);

    return {
      ...record,
      begin: beginCopy.toISOString(),
      end: endCopy.toISOString()
    };
  };

  return {
    ...data,
    records: data.records.map(shiftMonths)
  };
}
