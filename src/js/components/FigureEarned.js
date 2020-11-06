import * as React from 'react';
import { getTotalEarnedNumberOfRecords } from '../utils/reporting-fns';

export default function FigureEarned({ records }) {
  const earned = new Intl.NumberFormat([], {
    style: 'currency',
    currency: 'EUR'
  }).format(getTotalEarnedNumberOfRecords(records));

  return <span>{earned}</span>;
}
