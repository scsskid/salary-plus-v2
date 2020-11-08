import * as React from 'react';
import { getBonusEarned } from '../utils/reporting-fns';

export default function FigureBonus({ records }) {
  const bonus = new Intl.NumberFormat([], {
    style: 'currency',
    currency: 'EUR'
  }).format(getBonusEarned(records));

  return (
    <>
      <span>{bonus}</span>
    </>
  );
}
