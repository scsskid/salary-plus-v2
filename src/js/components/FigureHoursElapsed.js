import * as React from 'react';
import { getPaidHours } from '../utils/reporting-fns';

export default function FigureHoursElapsed({ records }) {
  return <span>{getPaidHours(records)}h</span>;
}
