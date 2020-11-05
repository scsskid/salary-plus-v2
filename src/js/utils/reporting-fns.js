import { getHoursElapsed } from './date-fns';
import { getTimeElapsed, timeToDecimal } from '../utils/date-fns';

export function addRecordHoursElapsed(acc, record) {
  return acc + getHoursElapsed(new Date(record.end) - new Date(record.begin));
}

export function getEarned(record) {
  return (
    timeToDecimal(
      getTimeElapsed(new Date(record.end) - new Date(record.begin))
    ) * record.rate
  );
}
