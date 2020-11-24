import * as React from 'react';
import { useHistory } from 'react-router-dom';
import * as reportingFns from './../utils/reporting-fns';
import useClock from '../hooks/useClock';
import FigureEarned from './FigureEarned';
import FigureHours from './FigureHours';
import LogToScreen from './LogToScreen';

export default function DateDetailsEntry({
  record = {},
  settings = {},
  job = {}
}) {
  const clock = useClock();
  const { language } = settings;
  const localeTimeStringOptions = {
    hour: '2-digit',
    minute: '2-digit'
  };
  let status;
  const history = useHistory();
  const datesObj = {
    begin: new Date(record.begin),
    end: new Date(record.end)
  };
  const time = {
    begin: datesObj.begin.toLocaleTimeString(language, localeTimeStringOptions),
    end: datesObj.end.toLocaleTimeString(language, localeTimeStringOptions)
  };
  const statusObj = {
    ongoing: clock.now >= datesObj.begin && clock.now <= datesObj.end,
    past: clock.now > datesObj.end,
    future: clock.now < datesObj.begin
  };
  const { trackOvertime, weekHours, daysPerWeek, dayHours: jobDataDayHours } =
    job || {};
  const dayHours =
    !isNaN(parseInt(jobDataDayHours)) || parseInt(jobDataDayHours) > 0
      ? jobDataDayHours
      : weekHours / daysPerWeek;

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
    contractEarned: reportingFns.getWorkedHoursWithoutOvertimeEarned([record]),
    actualEarned: reportingFns.getWorkedHoursEarned([record]),
    WorkedHours: reportingFns.getWorkedHours([record], 2),
    includedOvertime: reportingFns.getOvertimeHours([record], 2)
  };

  const debug = {
    // job,
    rate: record.rate,
    getWorkedHours: reportingFns.getWorkedHours([record]),
    getOvertimeHours: reportingFns.getOvertimeHours([record]),
    getWorkedHoursWithoutOvertime: reportingFns.getWorkedHoursWithoutOvertime([
      record
    ]),
    earned: {
      getOvertimeEarned: reportingFns.getOvertimeEarned([record]),
      getWorkedHoursWithoutOvertimeEarned: reportingFns.getWorkedHoursWithoutOvertimeEarned(
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
          <div
            className="date-details-entry-color"
            style={{ backgroundColor: job?.color }}
          ></div>
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
            DayHours: {dayHours} <br />
            {record.rate && (
              <FigureEarned records={[record]} settings={settings} />
            )}
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
      <LogToScreen title="local debug obj" object={debug} settings={settings} />
      <LogToScreen title="record" object={record} settings={settings} />
    </>
  );
}
