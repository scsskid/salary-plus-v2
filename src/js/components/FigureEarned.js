import * as React from 'react';
import { getPaidHoursEarned } from '../utils/reporting-fns';

export default function FigureEarned({ records }) {
  const earned = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  }).format(getPaidHoursEarned(records));

  return <span>{earned}</span>;
}
