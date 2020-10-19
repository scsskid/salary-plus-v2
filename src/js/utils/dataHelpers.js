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
