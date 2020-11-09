import * as React from 'react';
import {
  getPaidHours,
  getPaidHoursWithoutOvertime,
  getOvertimeHours
} from '../utils/reporting-fns';

export default function FigureHoursElapsed({
  records,
  type = 'actual',
  fractionDigits = { maximumFractionDigits: 2, minimumFractionDigits: 0 }
}) {
  let hoursNumber;

  switch (type) {
    case 'actual':
      hoursNumber = getPaidHours(records);
      break;
    case 'overtime':
      hoursNumber = getOvertimeHours(records);
      break;
    case 'contract':
      hoursNumber = getPaidHoursWithoutOvertime(records);
      break;
    default:
      hoursNumber = () => {
        return 'Error: no Fn specified';
      };
  }

  const hoursFormatted = new Intl.NumberFormat('de-DE', {
    style: 'decimal',
    ...fractionDigits
  }).format(hoursNumber);

  return <span>{hoursFormatted}</span>;
}
