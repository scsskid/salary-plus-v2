import { round } from './helpers';

// hours

function withPrecision(value, precision) {
  return precision ? round(value, precision) : value;
  // return value <= 0 ? 0 : precision ? round(value, precision) : value;
}

function timeToHours(duration) {
  return duration / (1000 * 60 * 60);
}

function getHoursElapsed(records, precision = false) {
  const hoursElapsed = records.reduce((acc, record) => {
    const hours = timeToHours(new Date(record.end) - new Date(record.begin));
    return acc + hours;
  }, 0);

  return withPrecision(hoursElapsed, precision);
}

function getPaidHours(records, precision = false) {
  const paidHoursElapsed = records.reduce((acc, record) => {
    const hoursElapsed = getHoursElapsed([record]);

    return acc + hoursElapsed - (record.hoursUnpaid ?? 0);
  }, 0);

  return withPrecision(paidHoursElapsed, precision);
}

function getOvertimeHours(records, precision = false) {
  const overtimeHours = records.reduce((acc, record) => {
    const dayHours = parseInt(record.dayHours);
    if (isNaN(dayHours) || dayHours === 0) {
      return acc;
    }
    const hoursElapsed = getHoursElapsed([record]);

    return (
      acc + hoursElapsed - (record.hoursUnpaid ?? 0) - (record.dayHours ?? 0)
    );
  }, 0);

  return withPrecision(overtimeHours, precision);
}

function getPaidHoursWithoutOvertime(records, precision) {
  const paidHoursWithoutOvertime =
    getPaidHours(records) - getOvertimeHours(records);
  return withPrecision(paidHoursWithoutOvertime, precision);
}

// earned

function getEarned(records, { hourCalculationFn, precision }) {
  return records.reduce((acc, record) => {
    return acc + record.rate * hourCalculationFn([record], precision);
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

function getTotalsEarned(records) {
  return getPaidHoursEarned(records) + getBonusEarned(records);
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
  getPaidHoursEarned,
  getTotalsEarned
};
