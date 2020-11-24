import { round } from './helpers';

// utils

function withPrecision(value, precision) {
  return precision ? round(value, precision) : value;
}

function timeToHours(duration) {
  return duration / (1000 * 60 * 60);
}

function getHoursElapsed(records) {
  const hoursElapsed = records.reduce((acc, record) => {
    const hours = timeToHours(new Date(record.end) - new Date(record.begin));
    return acc + hours;
  }, 0);
  return hoursElapsed;
}

// return hours

function getWorkedHours(records) {
  const paidHoursElapsed = records.reduce((acc, record) => {
    const hoursElapsed = getHoursElapsed([record]);
    return acc + hoursElapsed - +record.hoursUnpaid;
  }, 0);

  return paidHoursElapsed;
}

function getOvertimeHours(records) {
  const overtimeHours = records.reduce((acc, record) => {
    const { hoursUnpaid, paymentType, weekHours, daysPerWeek } = record;
    const dayHours =
      paymentType === 'monthly' ? weekHours / daysPerWeek : record.dayHours;
    const hoursElapsed = getHoursElapsed([record]);

    return acc + hoursElapsed - +hoursUnpaid - +dayHours;
  }, 0);

  return overtimeHours;
}

function getWorkedHoursWithoutOvertime(records) {
  return getWorkedHours(records) - getOvertimeHours(records);
}

// return earned

function getEarned(records, hourCalculationFn) {
  return records.reduce((acc, record) => {
    return acc + record.rate * hourCalculationFn([record]);
  }, 0);
}

function getWorkedHoursEarned(records) {
  return getEarned(records, getWorkedHours);
}

function getOvertimeEarned(records) {
  return getEarned(records, getOvertimeHours);
}

function getWorkedHoursWithoutOvertimeEarned(records) {
  return getEarned(records, getWorkedHoursWithoutOvertime);
}

function getTotalsEarned(records) {
  return getWorkedHoursEarned(records) + getBonusEarned(records);
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
  getWorkedHours,
  getOvertimeHours,
  getWorkedHoursWithoutOvertime,
  getOvertimeEarned,
  getBonusEarned,
  getWorkedHoursWithoutOvertimeEarned,
  getWorkedHoursEarned,
  getTotalsEarned
};
