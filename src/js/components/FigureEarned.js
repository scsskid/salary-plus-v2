import * as React from 'react';

export default function FigureEarned({
  fractionDigits = {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  },
  settings = {},
  value
}) {
  const { language } = settings || {};

  const earned = new Intl.NumberFormat(language, {
    style: 'currency',
    currency: 'EUR',
    ...fractionDigits
  }).format(value);

  return <span>{earned}</span>;
}
