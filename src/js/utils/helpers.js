export function getWeekDayNames({
  dayStart = 1,
  format = 'short',
  locale = 'en'
}) {
  const names = [];
  const date = new Date('2020-10-04');
  date.setDate(date.getDate() + dayStart - 1);
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

export function referrerIsSameDomain() {
  const refProtocol = document.referrer.split(':')[0] + ':';
  const refHost = document.referrer.split('/')[2];

  return (
    refProtocol == window.location.protocol && refHost == window.location.host
  );
}

export const resolvedTimeZone = Intl.DateTimeFormat().resolvedOptions()
  .timeZone;

// dates

export function getShortIsoString(date) {
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - offset * 60 * 1000);
  return date.toISOString().split('T')[0];
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

export function getTimeOfDateISOString(ISOString) {
  return new Date(ISOString).toLocaleTimeString([], {
    hour12: false,
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

export function isSameMonth(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth()
  );
}

function getRecordBeginEnd({ dateBegin, begin, end }) {
  let dateEnd = new Date(dateBegin.getTime());

  // check if endtime is less that begin time (enddate is next day), if so add one day
  if (begin > end) {
    var recordedDateEnd = new Date(dateEnd);
    var recordedDateEndDay = recordedDateEnd.getDate();
    recordedDateEnd.setDate(recordedDateEndDay + 1);
    dateEnd = recordedDateEnd;
  }
  const timeSplits = {
    begin: begin.split(':'),
    end: end.split(':')
  };

  dateBegin.setHours(timeSplits.begin[0], timeSplits.begin[1], 0, 0);
  dateEnd.setHours(timeSplits.end[0], timeSplits.end[1], 0, 0);

  return [dateBegin.toISOString(), dateEnd.toISOString()];
}

export function mapFormDataToStorageObject({
  id,
  jobId,
  dateBegin,
  begin,
  end,
  ...rest
}) {
  const [beginDateTime, endDateTime] = getRecordBeginEnd({
    dateBegin,
    begin,
    end
  });

  const payload = {
    id,
    jobId,
    begin: beginDateTime,
    end: endDateTime,
    ...rest
  };

  delete payload.dates;

  return payload;
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

// DOM

export function getAutoOffsetHeight(el) {
  let offSetHeight;
  const clone = el.cloneNode(true);
  clone.style.height = 'auto';
  document.body.appendChild(clone);
  offSetHeight = clone.offsetHeight;
  clone.remove();
  return offSetHeight;
}
