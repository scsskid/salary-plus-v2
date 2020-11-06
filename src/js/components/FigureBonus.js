import * as React from 'react';
import { getTotalBonusNumberOfRecords } from '../utils/reporting-fns';

export default function FigureBonus({ records }) {
  const bonus = new Intl.NumberFormat([], {
    style: 'currency',
    currency: 'EUR'
  }).format(getTotalBonusNumberOfRecords(records));

  return (
    <>
      <span>{bonus}</span>
    </>
  );
}
