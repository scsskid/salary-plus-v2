import * as React from 'react';

export default function FigureBonus({ records }) {
  const bonusNumber = records.reduce((acc, record) => {
    return acc + parseFloat(record.bonus);
  }, 0);
  const bonus = new Intl.NumberFormat([], {
    style: 'currency',
    currency: 'EUR'
  }).format(bonusNumber);

  // return <>{bonusNumber > 0 && <span>{bonus}</span>}</>;
  return (
    <>
      <span>{bonus}</span>
    </>
  );
}
