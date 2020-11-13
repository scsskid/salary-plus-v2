export function getRecordsByDate({ records, date }) {
  return records.filter((record) => {
    const dateBegin = new Date(record.begin);
    return (
      dateBegin.getDate() === date.getDate() &&
      dateBegin.getMonth() === date.getMonth() &&
      dateBegin.getFullYear() === date.getFullYear()
    );
  });
}

export function getRecordsByMonth({ records = [], date = new Date() }) {
  return records.filter((record) => {
    const dateBegin = new Date(record.begin);
    return (
      dateBegin.getMonth() === date.getMonth() &&
      dateBegin.getFullYear() === date.getFullYear()
    );
  });
}

export function getRecordsByRange(
  records,
  dateRange = {
    start: new Date(),
    end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  }
) {
  return records.filter((record) => {
    return (
      record.begin > dateRange.start.toISOString() &&
      record.begin < dateRange.end.toISOString()
    );
  });
}

export function getMinMaxDateBeginOfRecords(records) {
  if (records.length === 0) {
    return;
  }

  const oldestRecord = records.reduce((acc, record) => {
    return record.begin < acc.begin ? record : acc;
  });
  const newestRecord = records.reduce((acc, record) => {
    return record.begin > acc.begin ? record : acc;
  });

  const oldestRecordDate = new Date(oldestRecord.begin);
  oldestRecordDate.setHours(0, 0, 0, 0);
  const newestRecordDate = new Date(newestRecord.begin);
  newestRecordDate.setHours(0, 0, 0, 0);
  newestRecordDate.setDate(newestRecordDate.getDate() + 1);

  return [oldestRecordDate, newestRecordDate];
}

export function getPastRecords(records = [], angleDate = new Date()) {
  return records.filter((record) => {
    return new Date(record.begin) < angleDate;
  });
}

export function getRecentRecords(records = [], limit = 1) {
  return [...records].sort(sortByDateDesc).splice(0, limit);
}

function sortByDateDesc(a, b) {
  return new Date(b.begin) - new Date(a.begin);
}
