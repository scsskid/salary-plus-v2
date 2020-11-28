import * as React from 'react';
import { NumberFormatter } from '../utils/helpers';

export default function FigureHours({
  colorize = false,
  settings = {},
  value
}) {
  const { language: locale } = settings;
  const formatter = new NumberFormatter(locale);
  console.log(formatter(12));

  let className = 'figure-hours';
  className += value < 1 ? ' value-negative' : '  value-not-negative';
  className += colorize ? ' value-colorize' : '';

  return (
    <span className={className}>
      {formatter(value)} <span className="figure-unit">h</span>
    </span>
  );
}
