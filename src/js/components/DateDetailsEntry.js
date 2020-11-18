import React from 'react';
import { useHistory } from 'react-router-dom';
import * as reportingFns from './../utils/reporting-fns';
import useClock from '../hooks/useClock';
import FigureEarned from './FigureEarned';
import FigureHours from './FigureHours';

export default function DateDetailsEntry({
  record = {},
  // jobs = [],
  showDebugInfo = false,
  settings = {}
}) {
  const clock = useClock();
  const { language } = settings;
  const localeTimeStringOptions = {
    hour: '2-digit',
    minute: '2-digit'
  };
  let status;
  // const clock = { now: new Date('2020/11/14 13:00') };
  // const job = jobs.find((job) => job.id == record.jobId);
  const history = useHistory();
  const datesObj = {
    begin: new Date(record.begin),
    end: new Date(record.end)
  };
  const time = {
    // begin: getLocaleTimeString(datesObj.begin),

    begin: datesObj.begin.toLocaleTimeString(language, localeTimeStringOptions),
    end: datesObj.end.toLocaleTimeString(language, localeTimeStringOptions)
    // end: getLocaleTimeString(datesObj.end)
  };
  const statusObj = {
    ongoing: clock.now >= datesObj.begin && clock.now <= datesObj.end,
    past: clock.now > datesObj.end,
    future: clock.now < datesObj.begin
  };

  const classList = ['date-details-entry'];

  for (const prop in statusObj) {
    const value = statusObj[prop];
    if (value) {
      classList.push(` date-details-entry--${prop}`);
      status = prop;
    }
  }

  const className = classList.join(' ');

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
        className={className}
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
            {record.jobName} [{status}]
            {statusObj.ongoing && <span className="is-ongoing">now</span>}
          </h2>

          <div className="date-details-entry-meta">
            <FigureEarned records={[record]} settings={settings} />
            <FigureHours records={[record]} settings={settings} />
            {reporting.includedOvertime !== 0 && (
              <p>
                Overtime:{' '}
                <FigureHours
                  type="overtime"
                  colorize={true}
                  records={[record]}
                  settings={settings}
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
