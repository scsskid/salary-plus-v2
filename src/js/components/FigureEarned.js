import * as React from 'react';
import { NumberFormatter } from '../utils/helpers';

export default function FigureEarned({ settings = {}, value }) {
  const { language: locale } = settings || {};
  const formatter = new NumberFormatter(locale, {
    style: 'currency',
    currency: 'EUR'
  });

  return <span>{formatter(value)}</span>;
}
