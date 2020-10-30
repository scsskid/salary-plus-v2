// const dateFormatOptions = {
//   nice: {
//     weekday: 'short',
//     year: 'numeric',
//     month: 'short',
//     day: '2-digit'
//   },
//   short: {
//     year: 'numeric',
//     month: 'short',
//     day: '2-digit'
//   }
// };

export function getWeekDayNames({ format = 'short', locale = 'en' }) {
  const names = [];
  const date = new Date('2020-10-04');
  let days = 7;

  while (days !== 0) {
    date.setDate(date.getDate() + 1);
    names.push(date.toLocaleDateString(locale, { weekday: format }));
    days--;
  }

  return names;
}

// general

export function pad(n) {
  return n < 10 ? '0' + n : n;
}

export const resolvedTimeZone = Intl.DateTimeFormat().resolvedOptions()
  .timeZone;

// dates

export function getLocaleTimeString(date) {
  return date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function getIntlDateTimeFormat(
  date = new Date(),
  options = {
    // timeZone: Intl.DateTimeFormat().resolvedOptions(),
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }
) {
  return new Intl.DateTimeFormat(undefined, options).format(date);
}

export function getShortIsoString(date) {
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - offset * 60 * 1000);
  return date.toISOString().split('T')[0];
}

// export function getDayNames() {
//   return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
// }

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

export function getDateFromFormInputDate(string) {
  const dateBeginSplit = string.split('/');
  const dateIsoString = `${dateBeginSplit[0]}-${dateBeginSplit[1]}-${dateBeginSplit[2]}`;
  return new Date(dateIsoString);
}

export function parseFormData(formData) {
  const formEntries = new FormData(formData).entries();
  const data = {};

  for (var [formElementName, value] of formEntries) {
    data[formElementName] = value;
  }

  return data;
}

export function mapFormDataToStorageObject(record) {
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
    jobName: record.jobName || '',
    begin,
    end,
    bonus: record.bonus || '',
    note: record.note || '',
    sickLeave: record.sickLeave || '',
    status: record.status || '',
    rate: record.rate || '',
    interval: record.rateInterval || ''
  };
}

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

export { formatDate };

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

export function round(num, decimalPlaces = 0) {
  num = Math.round(Math.abs(num) + 'e' + decimalPlaces) * Math.sign(num);
  return Number(num + 'e' + -decimalPlaces);
}

export function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last, deferTimer;
  return function () {
    var context = scope || this;

    var now = +new Date(),
      args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

export function setAppInnerHeight() {
  document.documentElement.style.setProperty(
    '--vh',
    window.innerHeight * 0.01 + 'px'
  );
}
