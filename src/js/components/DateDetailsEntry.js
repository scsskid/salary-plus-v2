import React from 'react';
import { useHistory } from 'react-router-dom';
import { getLocaleTimeString } from '../utils/helpers';
import * as reportingFns from './../utils/reporting-fns';
import { useClock } from '../utils/hooks';
import FigureEarned from './FigureEarned';
import FigureHours from './FigureHours';

export default function DateDetailsEntry({
  record = {},
  // jobs = [],
  showDebugInfo = false
}) {
  const clock = useClock();
  // const clock = { now: new Date('2020/11/14 13:00') };
  // const job = jobs.find((job) => job.id == record.jobId);
  const history = useHistory();
  const datesObj = {
    begin: new Date(record.begin),
    end: new Date(record.end)
  };
  const time = {
    begin: getLocaleTimeString(datesObj.begin),
    end: getLocaleTimeString(datesObj.end)
  };
  const ongoing = clock.now >= datesObj.begin && clock.now <= datesObj.end;

  function handleClick() {
    history.push(`/records/${record.id}`);
  }

  const reporting = {
    contractEarned: reportingFns.getPaidHoursWithoutOvertimeEarned([record]),
    actualEarned: reportingFns.getPaidHoursEarned([record]),
    paidHours: reportingFns.getPaidHours([record], 2),
    includedOvertime: reportingFns.getOvertimeHours([record], 2)
  };

  const debug = {
    // job,
    rate: record.rate,
    getPaidHours: reportingFns.getPaidHours([record]),
    getOvertimeHours: reportingFns.getOvertimeHours([record]),
    getPaidHoursWithoutOvertime: reportingFns.getPaidHoursWithoutOvertime([
      record
    ]),
    earned: {
      getOvertimeEarned: reportingFns.getOvertimeEarned([record]),
      getPaidHoursWithoutOvertimeEarned: reportingFns.getPaidHoursWithoutOvertimeEarned(
        [record]
      )
    }
  };

  return (
    <>
      <button
        type="button"
        className="date-details-entry"
        data-record-id={record.id}
        onClick={handleClick}
      >
        <div className="date-details-entry-time">
          <time
            className="date-details-entry-time-begin"
            dateTime="{time.begin}"
          >
            {time.begin}
          </time>
          <time className="date-details-entry-time-end" dateTime="{time.end}">
            {time.end}
          </time>
        </div>

        <div className="date-details-entry-content">
          <h2>
            {record.jobName}{' '}
            {ongoing && <span className="is-ongoing">now</span>}
          </h2>

          <div className="date-details-entry-meta">
            <FigureEarned records={[record]} />
            <FigureHours colorize={true} records={[record]} />
            {reporting.includedOvertime !== 0 && (
              <p>
                Overtime:{' '}
                <FigureHours
                  type="overtime"
                  colorize={true}
                  records={[record]}
                />
              </p>
            )}
            {record.sickLeave && <span> [sick]</span>}
          </div>
        </div>
      </button>
      {showDebugInfo && (
        <>
          <pre style={{ fontSize: '12px' }}>
            {JSON.stringify(debug, null, 2)}
          </pre>
          <pre style={{ fontSize: '12px' }}>
            {JSON.stringify(record, null, 2)}
          </pre>
        </>
      )}
    </>
  );
}
