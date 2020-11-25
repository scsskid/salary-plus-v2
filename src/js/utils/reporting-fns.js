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

function getLinkedJob(jobId, jobs = []) {
  return jobs.find((job) => job.id === jobId);
}

// return hours

function getWorkedHours(records, jobs = []) {
  const paidHoursElapsed = records.reduce((acc, record) => {
    const hoursElapsed = getHoursElapsed([record]);
    const { hoursUnpaid } = getLinkedJob(record.jobId, jobs) ?? record;
    return acc + hoursElapsed - +hoursUnpaid;
  }, 0);

  return paidHoursElapsed;
}

function getOvertimeHours(records, jobs = []) {
  const overtimeHours = records.reduce((acc, record) => {
    const hoursElapsed = getHoursElapsed([record]);
    const { hoursUnpaid, paymentType, weekHours, daysPerWeek } =
      getLinkedJob(record.jobId, jobs) ?? record;
    const canCalculateFixedIncomeDayHours = weekHours && daysPerWeek;
    const dayHours =
      canCalculateFixedIncomeDayHours && 'monthly' === paymentType
        ? weekHours / daysPerWeek
        : record.dayHours;

    if (!dayHours) {
      return;
    }

    return acc + hoursElapsed - +hoursUnpaid - +dayHours;
  }, 0);

  return overtimeHours;
}

function getWorkedHoursWithoutOvertime(records, jobs = []) {
  return getWorkedHours(records, jobs) - getOvertimeHours(records, jobs);
}

// return earned

function getReducedFixedMonthlyIncomeUnique(records) {
  const jobSalaries = records
    .filter(function (record) {
      const combinedKey = record.jobId + '|' + record.monthlyIncome;
      if (!this[combinedKey] && record.paymentType === 'monthly') {
        this[combinedKey] = true;
        return true;
      }
    }, Object.create(null))
    .map(({ jobId, monthlyIncome }) => {
      return { jobId, monthlyIncome };
    })
    .reduce((acc, job) => {
      const newArr = acc[job.jobId]
        ? [...acc[job.jobId], job.monthlyIncome]
        : [job.monthlyIncome];
      return {
        ...acc,
        [job.jobId]: newArr
      };
    }, {});

  const result = [];

  for (let el in jobSalaries) {
    const sum = jobSalaries[el].reduce((acc, sum) => acc + sum, 0);
    result.push(sum / jobSalaries[el].length);
  }

  return result.reduce((acc, num) => acc + num, 0);
}

function getEarned(records, hourCalculationFn, jobs = []) {
  const { name: hourCalcFnName } = hourCalculationFn;
  const earnedHoursBased = records.reduce((acc, record) => {
    const { paymentType, /* monthlyIncome, */ derivedHourlyRate } =
      getLinkedJob(record.jobId, jobs) ?? record;
    const rate =
      paymentType === 'monthly' && 'getOvertimeHours' == hourCalcFnName
        ? derivedHourlyRate
        : record.rate;

    return acc + rate * hourCalculationFn([record]);
  }, 0);

  const fixedIncome =
    'getWorkedHoursWithoutOvertime' == hourCalcFnName
      ? getReducedFixedMonthlyIncomeUnique(records)
      : 0;
  return earnedHoursBased + fixedIncome;
}

function getWorkedHoursWithoutOvertimeEarned(records) {
  return getEarned(records, getWorkedHoursWithoutOvertime);
}

function getOvertimeEarned(records) {
  return getEarned(records, getOvertimeHours);
}

function getWorkedHoursEarned(records) {
  return (
    getEarned(records, getWorkedHoursWithoutOvertime) +
    getEarned(records, getOvertimeHours)
  );
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
  getTotalsEarned,
  getReducedFixedMonthlyIncomeUnique,
  getLinkedJob
};
