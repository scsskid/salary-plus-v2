import React from 'react';
import { useHistory } from 'react-router-dom';
import { getLocaleTimeString } from '../utils/helpers';
import * as reportingFns from './../utils/reporting-fns';

export default function DateDetailsEntry({ record, jobs }) {
  const job = jobs.find((job) => job.id == record.jobId);
  const history = useHistory();
  const time = {
    begin: getLocaleTimeString(new Date(record.begin)),
    end: getLocaleTimeString(new Date(record.end))
  };

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
            {record.jobName} {job ? '' : ''}
          </h2>

          <p className="date-details-entry-meta">
            <span>{reporting.actualEarned}€</span>
            <span>{reporting.paidHours}h</span>
            {reporting.includedOvertime > 0 && (
              <span style={{ color: 'red' }}>
                (+{reporting.includedOvertime}h)
              </span>
            )}

            {record.sickLeave && <span> [sick]</span>}
          </p>
        </div>
      </button>
      <pre style={{ fontSize: '12px' }}>{JSON.stringify(debug, null, 2)}</pre>
      <pre style={{ fontSize: '12px' }}>{JSON.stringify(record, null, 2)}</pre>
    </>
  );
}
