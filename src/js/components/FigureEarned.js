import * as React from 'react';
import {
  getOvertimeEarned,
  getPaidHoursEarned,
  getPaidHoursWithoutOvertimeEarned
} from '../utils/reporting-fns';

export default function FigureEarned({
  records,
  type = 'actual',
  fractionDigits = {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  }
}) {
  let earnedCalculationFn;

  switch (type) {
    case 'actual':
      earnedCalculationFn = getPaidHoursEarned;
      break;
    case 'overtime':
      earnedCalculationFn = getOvertimeEarned;
      break;
    case 'contract':
      earnedCalculationFn = getPaidHoursWithoutOvertimeEarned;
      break;
    default:
      earnedCalculationFn = () => {
        return 'Error: no Fn specified';
      };
  }

  const earned = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    ...fractionDigits
  }).format(earnedCalculationFn(records));

  return <span>{earned}</span>;
}
