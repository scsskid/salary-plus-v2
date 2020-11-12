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

export function getRecordsByMonth({ records, date }) {
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
