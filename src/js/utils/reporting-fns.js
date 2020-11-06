import { getHoursElapsed, getTimeElapsed, timeToDecimal } from './date-fns';
import { round } from './helpers';

function getTotalBonusNumberOfRecords(records) {
  return records.reduce((acc, record) => {
    const bonusNumber = parseFloat(record.bonus);
    const bonus = !isNaN(bonusNumber) ? bonusNumber : 0;
    return acc + bonus;
  }, 0);
}

function getTotalEarnedNumberOfRecords(records) {
  return records.reduce((acc, record) => {
    return acc + getEarned(record);
  }, 0);
}

function getTotalHoursElapsedOfRecords(records) {
  return round(
    records.reduce((acc, record) => {
      return (
        acc + getHoursElapsed(new Date(record.end) - new Date(record.begin))
      );
    }, 0),
    2
  );
}

function getTotalIncomeOfRecords(records) {
  return (
    getTotalEarnedNumberOfRecords(records) +
    getTotalBonusNumberOfRecords(records)
  );
}

function getEarned(record) {
  return (
    timeToDecimal(
      getTimeElapsed(new Date(record.end) - new Date(record.begin))
    ) * record.rate
  );
}

export {
  getTotalBonusNumberOfRecords,
  getTotalEarnedNumberOfRecords,
  getTotalHoursElapsedOfRecords,
  getTotalIncomeOfRecords
};
