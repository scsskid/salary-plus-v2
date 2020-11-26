import * as React from 'react';

export default function FigureHours({
  fractionDigits = { maximumFractionDigits: 2, minimumFractionDigits: 0 },
  colorize = false,
  settings = {},
  value
}) {
  let className = 'figure-hours';
  const { language } = settings;
  className += value < 1 ? ' value-negative' : '  value-not-negative';
  className += colorize ? ' value-colorize' : '';

  const hoursFormatted = new Intl.NumberFormat(language, {
    style: 'decimal',
    ...fractionDigits
  }).format(value);

  return (
    <span className={className}>
      {hoursFormatted} <span className="figure-unit">h</span>
    </span>
  );
}
