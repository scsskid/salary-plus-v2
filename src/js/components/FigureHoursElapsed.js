import * as React from 'react';
import { addRecordHoursElapsed } from '../utils/reporting-fns';
import { round } from '../utils/helpers';

export default function FigureHoursElapsed({ records }) {
  return <span>{round(records.reduce(addRecordHoursElapsed, 0), 2)}h</span>;
}
