import * as React from 'react';
import { getEarned } from '../utils/reporting-fns';

export default function FigureEarned({ records }) {
  const earnedNumber = records.reduce((acc, record) => {
    return acc + getEarned(record);
  }, 0);
  const earned = new Intl.NumberFormat([], {
    style: 'currency',
    currency: 'EUR'
  }).format(earnedNumber);

  return <span>{earned}</span>;
}
