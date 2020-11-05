import * as React from 'react';
import { addRecordHoursElapsed } from '../utils/reporting-fns';
import { round } from '../utils/helpers';

export default function FigureHoursElapsed({ records }) {
  return <>{round(records.reduce(addRecordHoursElapsed, 0), 2)}</>;
}
