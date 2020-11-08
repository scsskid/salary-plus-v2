import * as React from 'react';
import { getPaidHoursEarned, getBonusEarned } from '../utils/reporting-fns';

export default function FigureTotals({ records }) {
  const totals = getPaidHoursEarned(records) + getBonusEarned(records);

  const totalsFormatted = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  }).format(totals);

  return <span>{totalsFormatted}</span>;
}
