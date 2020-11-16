import * as React from 'react';
import {
  getPaidHours,
  getPaidHoursWithoutOvertime,
  getOvertimeHours
} from '../utils/reporting-fns';

export default function FigureHours({
  records,
  type = 'actual',
  fractionDigits = { maximumFractionDigits: 2, minimumFractionDigits: 0 },
  colorize = false,
  settings
}) {
  let hoursNumber;
  let className = 'figure-hours';

  switch (type) {
    case 'actual':
      hoursNumber = getPaidHours(records);
      break;
    case 'overtime':
      hoursNumber = getOvertimeHours(records);
      className += hoursNumber < 1 ? ' value-negative' : '  value-not-negative';
      break;
    case 'contract':
      hoursNumber = getPaidHoursWithoutOvertime(records);
      break;
    default:
      hoursNumber = () => {
        return 'Error: no Fn specified';
      };
  }

  className += colorize ? ' value-colorize' : '';

  const hoursFormatted = new Intl.NumberFormat('de-DE', {
    style: 'decimal',
    ...fractionDigits
  }).format(hoursNumber);

  return (
    <span className={className}>
      {hoursFormatted} <span className="figure-unit">h</span>
    </span>
  );
}
