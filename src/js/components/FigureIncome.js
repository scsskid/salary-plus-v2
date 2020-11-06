import * as React from 'react';
import { getTotalIncomeOfRecords } from '../utils/reporting-fns';

export default function FigureIncome({ records }) {
  const earned = new Intl.NumberFormat([], {
    style: 'currency',
    currency: 'EUR'
  }).format(getTotalIncomeOfRecords(records));

  return <span>{earned}</span>;
}
