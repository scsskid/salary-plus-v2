import { round } from './helpers';

// time New

function timeToHours(duration) {
  return duration / (1000 * 60 * 60);
}

function getHoursElapsed(records, precision = false) {
  const hoursElapsed = records.reduce((acc, record) => {
    const hours = timeToHours(new Date(record.end) - new Date(record.begin));
    return acc + hours;
  }, 0);

  return precision ? round(hoursElapsed, round.decimalPlaces) : hoursElapsed;
}

function getPaidHours(records, precision = false) {
  const paidHoursElapsed = records.reduce((acc, record) => {
    const hoursElapsed = getHoursElapsed([record]);

    return acc + hoursElapsed - (record.hoursUnpaid ?? 0);
  }, 0);

  return precision
    ? round(paidHoursElapsed, round.decimalPlaces)
    : paidHoursElapsed;
}

function getOvertimeHours(records, precision = false) {
  const overtimeHours = records.reduce((acc, record) => {
    const hoursElapsed = getHoursElapsed([record]);

    return (
      acc + hoursElapsed - (record.hoursUnpaid ?? 0) - (record.dayHours ?? 0)
    );
  }, 0);

  return overtimeHours <= 0
    ? 0
    : precision
    ? round(overtimeHours, round.decimalPlaces)
    : overtimeHours;
}

function getPaidHoursWithoutOvertime(records) {
  return getPaidHours(records) - getOvertimeHours(records);
}

// earned

function getEarned(records, hourCalculationFn) {
  return records.reduce((acc, record) => {
    console.log(acc, record.rate, hourCalculationFn(records));

    return acc + record.rate * hourCalculationFn(records);
  }, 0);
}

function getOvertimeEarned(records) {
  return getEarned(records, getOvertimeHours);
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
  getBonusEarned
};
