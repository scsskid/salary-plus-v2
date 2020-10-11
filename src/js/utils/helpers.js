// general

export function pad(n) {
  return n < 10 ? '0' + n : n;
}

// dates

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

export function getTimeOfDate(string) {
  return new Date(string).toLocaleTimeString('DE-de', {
    hour: '2-digit',
    minute: '2-digit'
  });
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

export function isSameDay(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

const formatDate = {
  rfc3339: (date) => {
    // target: YYYY-MM-DD
    var year = date.getFullYear().toString();
    var month = (date.getMonth() + 101).toString().substring(1); // 101 because first month is 0 not 1
    var day = (date.getDate() + 100).toString().substring(1);
    return year + '-' + month + '-' + day;
  }
};

// Input Handling

export function parseFormData(formData) {
  const formEntries = new FormData(formData).entries();
  const data = {};

  for (var [formElementName, value] of formEntries) {
    data[formElementName] = value;
  }

  return data;
}

const mapFormDataToStorageObject = (record) => {
  record.dateBegin = record.dateBegin.replace(/-/g, '/');
  record.dateEnd = record.dateBegin;

  // check if endtime is less that begin time (enddate is next day), if so add one day
  if (record.timeBegin > record.timeEnd) {
    var recordedDate = new Date(record.dateEnd);
    var recordedDay = recordedDate.getDate();
    recordedDate.setDate(recordedDay + 1);
    record.dateEnd = recordedDate.toDateString();
  }

  let begin = new Date(record.dateBegin + ' ' + record.timeBegin).toISOString();
  let end = new Date(record.dateEnd + ' ' + record.timeEnd).toISOString();

  delete record.dateEnd; // ? otherwise it get returned, why?

  return {
    id: parseInt(record.id),
    jobId: parseInt(record.jobId),
    begin,
    end,
    bonus: record.bonus || '',
    note: record.note || '',
    sickLeave: record.sickLeave == 'on' ? 'true' : '' || '',
    status: record.status || '',
    rate: record.rate || '',
    interval: record.rateInterval || ''
  };
};

/**
 * add object to or alter obj in array
 * @param {obj} obj
 * @param {array} array
 */
export function mutateArrayWithObject(obj, array) {
  const targetIndex = array.findIndex((el) => {
    return el.id == obj.id;
  });
  array[targetIndex] = obj;

  return array;
}

export function insertEntry() {}

export { formatDate, mapFormDataToStorageObject };

// Development

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
