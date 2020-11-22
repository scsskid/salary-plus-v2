import * as React from 'react';
import {
  getOvertimeEarned,
  getPaidHoursEarned,
  getPaidHoursWithoutOvertimeEarned,
  getTotalsEarned,
  getBonusEarned
} from '../utils/reporting-fns';

export default function FigureEarned({
  records = [],
  type = 'actual',
  fractionDigits = {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  },
  settings = {}
}) {
  let earnedCalculationFn;
  const { language } = settings || {};

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
    case 'bonus':
      earnedCalculationFn = getBonusEarned;
      break;
    case 'totals':
      earnedCalculationFn = getTotalsEarned;
      break;
    default:
      earnedCalculationFn = () => {
        return 'Error: no Fn specified';
      };
  }

  const earned =
    new Intl.NumberFormat(language, {
      style: 'currency',
      currency: 'EUR',
      ...fractionDigits
    }).format(earnedCalculationFn(records)) || 0;

  return <span>{earned}</span>;
}
