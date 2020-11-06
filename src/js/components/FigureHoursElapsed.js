import * as React from 'react';
import { getTotalHoursElapsedOfRecords } from '../utils/reporting-fns';

export default function FigureHoursElapsed({ records }) {
  return <span>{getTotalHoursElapsedOfRecords(records)}h</span>;
}
