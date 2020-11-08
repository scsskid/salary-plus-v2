import * as React from 'react';
import {
  getPaidHours,
  getPaidHoursWithoutOvertime,
  getOvertimeHours
} from '../utils/reporting-fns';

export default function FigureHoursElapsed({ records, type = 'actual' }) {
  let hourCalculationFn;

  switch (type) {
    case 'actual':
      hourCalculationFn = getPaidHours;
      break;
    case 'overtime':
      hourCalculationFn = getOvertimeHours;
      break;
    case 'contract':
      hourCalculationFn = getPaidHoursWithoutOvertime;
      break;
    default:
      hourCalculationFn = () => {
        return 'Error: no Fn specified';
      };
  }

  return <span>{hourCalculationFn(records, 2)}h</span>;
}
