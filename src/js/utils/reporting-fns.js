import { getHoursElapsed, getTimeElapsed, timeToDecimal } from './date-fns';
import { round } from './helpers';

function getTotalBonusNumberOfRecords(records) {
  return records.reduce((acc, record) => {
    const bonusNumber = parseFloat(record.bonus);
    const bonus = !isNaN(bonusNumber) ? bonusNumber : 0;
    return acc + bonus;
  }, 0);
}

function getEarned(record, type = 'netto') {
  const earnedBrutto =
    timeToDecimal(
      getTimeElapsed(new Date(record.end) - new Date(record.begin))
    ) * record.rate;

  const earnedNetto = earnedBrutto - (record.hoursUnpaid ?? 0) * record.rate;

  return type === 'brutto' ? earnedNetto : earnedNetto;
}

function getTotalEarnedNumberOfRecords(records) {
  return records.reduce((acc, record) => {
    return acc + getEarned(record);
  }, 0);
}

function getTotalHoursElapsedOfRecords(records) {
  const hoursElapsed = records.reduce((acc, record) => {
    return (
      acc + getHoursElapsed(new Date(record.end) - new Date(record.begin)) // - hoursUnpaid
    );
  }, 0);

  return round(hoursElapsed, 2);
}

function getTotalUnpaidHours(records) {
  return records.reduce((acc, record) => {
    return acc + (record.hoursUnpaid ?? 0);
  }, 0);
}

function getOverTimeOfRecord(record, dayHours = 0) {
  const totalHours = getHoursElapsed(
    new Date(record.end) - new Date(record.begin)
  );

  return totalHours - dayHours;
}

function getTotalIncomeOfRecords(records) {
  return (
    getTotalEarnedNumberOfRecords(records) +
    getTotalBonusNumberOfRecords(records)
  );
}

export {
  getTotalBonusNumberOfRecords,
  getTotalEarnedNumberOfRecords,
  getTotalHoursElapsedOfRecords,
  getTotalIncomeOfRecords,
  getTotalUnpaidHours,
  getOverTimeOfRecord
};
