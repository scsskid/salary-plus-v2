import * as React from 'react';
import { useHistory } from 'react-router-dom';
import * as r from './../utils/reporting-fns';
import useClock from '../hooks/useClock';
import FigureHours from './FigureHours';
import FigureEarned from './FigureEarned';
import LogToScreen from './LogToScreen';

export default function DateDetailsEntry({
  record = {},
  settings = {},
  jobs = {}
}) {
  const classList = ['date-details-entry'];
  const className = classList.join(' ');
  const source = settings.reportingSource;
  const { begin, end, jobId } = record || {};
  const linkedJob = r.getLinkedJob(jobId, jobs) || {};
  const { paymentType, rate } = source === 'record' ? record : linkedJob;

  const history = useHistory();
  const { language } = settings;
  const clock = useClock();
  const localeTimeStringOptions = {
    hour: '2-digit',
    minute: '2-digit'
  };

  let status;

  const datesObj = {
    begin: new Date(begin),
    end: new Date(end)
  };

  const timeDisplay = {
    begin: datesObj.begin.toLocaleTimeString(language, localeTimeStringOptions),
    end: datesObj.end.toLocaleTimeString(language, localeTimeStringOptions)
  };

  const statusObj = {
    ongoing: clock.now >= datesObj.begin && clock.now <= datesObj.end,
    past: clock.now > datesObj.end,
    future: clock.now < datesObj.begin
  };

  for (const prop in statusObj) {
    const value = statusObj[prop];
    if (value) {
      classList.push(` date-details-entry--${prop}`);
      status = prop;
    }
  }

  function handleClick() {
    history.push(`/records/${record.id}`);
  }

  /* Record Reporting Values */

  const workedHours = r.getWorkedHours(
    [record],
    source === 'jobs' ? jobs : undefined
  );

  const overtimeHours = r.getOvertimeHours(
    [record],
    source === 'jobs' ? jobs : undefined
  );

  const workedHoursEarned =
    paymentType !== 'monthly' ? r.getWorkedHoursEarned([record]) : undefined;
  const contractEarned =
    paymentType !== 'monthly'
      ? r.getWorkedHoursWithoutOvertime(
          [record],
          source === 'jobs' ? jobs : undefined
        ) * rate
      : undefined;

  const debug = {
    workedHours,
    overtimeHours,
    workedHoursEarned,
    contractEarned
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
          <div
            className="date-details-entry-color"
            style={{ backgroundColor: linkedJob?.color }}
          ></div>
          <time
            className="date-details-entry-time-begin"
            dateTime={timeDisplay.begin}
          >
            {timeDisplay.begin}
          </time>
          <time
            className="date-details-entry-time-end"
            dateTime={timeDisplay.end}
          >
            {timeDisplay.end}
          </time>
        </div>

        <div className="date-details-entry-content">
          <h2>
            {record.jobName} [{status}]
            {statusObj.ongoing && <span className="is-ongoing">now</span>}
          </h2>

          <div className="date-details-entry-meta">
            <p>
              Data Source: <b>{source}</b>
            </p>
            workedHoursEarned:
            {workedHoursEarned ? (
              <FigureEarned value={workedHoursEarned} settings={settings} />
            ) : (
              <code> {String(workedHoursEarned)}</code>
            )}
            <br />
            contractEarned:
            {contractEarned ? (
              <FigureEarned value={contractEarned} settings={settings} />
            ) : (
              <code> {String(contractEarned)}</code>
            )}
            <hr />
            workedHours:{' '}
            {workedHours ? (
              <FigureHours value={workedHours} settings={settings} />
            ) : (
              <p>
                <code>{String(workedHours)}</code>
              </p>
            )}
            <br />
            overtimeHours:{' '}
            {overtimeHours ? (
              <FigureHours value={overtimeHours} settings={settings} />
            ) : (
              <p>
                <code>{String(overtimeHours)}</code>
              </p>
            )}
            {record.sickLeave && <span> [sick]</span>}
          </div>
        </div>
      </button>
      <LogToScreen title="record" object={record} settings={settings} />
      <LogToScreen title="linkedJob" object={linkedJob} settings={settings} />
      <LogToScreen title="debug" object={debug} settings={settings} />
    </>
  );
}
