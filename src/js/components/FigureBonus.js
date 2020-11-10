import * as React from 'react';
import { getBonusEarned } from '../utils/reporting-fns';

export default function FigureBonus({
  records,
  fractionDigits = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }
}) {
  const bonus = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    ...fractionDigits
  }).format(getBonusEarned(records));

  return (
    <>
      <span>{bonus}</span>
    </>
  );
}
