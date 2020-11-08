import { round } from './helpers';

// hours

function withPresicion(value, precision) {
  return value <= 0 ? 0 : precision ? round(value, precision) : value;
}

function timeToHours(duration) {
  return duration / (1000 * 60 * 60);
}

function getHoursElapsed(records, precision = false) {
  const hoursElapsed = records.reduce((acc, record) => {
    const hours = timeToHours(new Date(record.end) - new Date(record.begin));
    return acc + hours;
  }, 0);

  return withPresicion(hoursElapsed, precision);
}

function getPaidHours(records, precision = false) {
  const paidHoursElapsed = records.reduce((acc, record) => {
    const hoursElapsed = getHoursElapsed([record]);

    return acc + hoursElapsed - (record.hoursUnpaid ?? 0);
  }, 0);

  return withPresicion(paidHoursElapsed, precision);
}

function getOvertimeHours(records, precision = false) {
  const overtimeHours = records.reduce((acc, record) => {
    const hoursElapsed = getHoursElapsed([record]);

    return (
      acc + hoursElapsed - (record.hoursUnpaid ?? 0) - (record.dayHours ?? 0)
    );
  }, 0);

  return withPresicion(overtimeHours, precision);
}

function getPaidHoursWithoutOvertime(records, precision) {
  const paidHoursWithoutOvertime =
    getPaidHours(records) - getOvertimeHours(records);
  return withPresicion(paidHoursWithoutOvertime, precision);
}

// earned

function getEarned(records, { hourCalculationFn, precision }) {
  return records.reduce((acc, record) => {
    return acc + record.rate * hourCalculationFn(records, precision);
  }, 0);
}

function getPaidHoursEarned(records) {
  return getEarned(records, { hourCalculationFn: getPaidHours, precision: 2 });
}

function getOvertimeEarned(records) {
  return getEarned(records, {
    hourCalculationFn: getOvertimeHours,
    precision: 2
  });
}

function getPaidHoursWithoutOvertimeEarned(records) {
  return getEarned(records, {
    hourCalculationFn: getPaidHoursWithoutOvertime,
    precision: 2
  });
}

// Bonus

function getBonusEarned(records) {
  return records.reduce((acc, record) => {
    const bonusNumber = parseFloat(record.bonus);
    const bonus = !isNaN(bonusNumber) ? bonusNumber : 0;
    return acc + bonus;
  }, 0);
}

export {
  getPaidHours,
  getOvertimeHours,
  getPaidHoursWithoutOvertime,
  getOvertimeEarned,
  getBonusEarned,
  getPaidHoursWithoutOvertimeEarned,
  getPaidHoursEarned
};
