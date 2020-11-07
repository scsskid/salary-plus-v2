import React from 'react';
import { useHistory } from 'react-router-dom';
import { getLocaleTimeString } from '../utils/helpers';
// import FigureBonus from './FigureBonus';
import FigureEarned from './FigureEarned';
import FigureHoursElapsed from './FigureHoursElapsed';
import * as utils from './../utils/reporting-fns';

export default function DateDetailsEntry({ record, jobs, settings }) {
  const job = jobs.find((job) => job.id == record.jobId);
  const history = useHistory();
  const time = {
    begin: getLocaleTimeString(new Date(record.begin)),
    end: getLocaleTimeString(new Date(record.end))
  };

  function handleClick() {
    history.push(`/records/${record.id}`);
  }

  const meta = {
    job,
    rate: record.rate,
    getPaidHours: utils.getPaidHours([record]),
    getOvertimeHours: utils.getOvertimeHours([record]),
    getPaidHoursWithoutOvertime: utils.getPaidHoursWithoutOvertime([record]),
    reporting: {
      getOvertimeEarned: utils.getOvertimeEarned([record])
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
            {/* Todo: Duration String: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time  */}{' '}
            <FigureEarned records={[record]} />
            {/* <FigureBonus records={[record]} /> */}
            <FigureHoursElapsed records={[record]} />
            {record.sickLeave && <span> [sick]</span>}
          </p>
        </div>
      </button>
      <pre style={{ fontSize: '12px' }}>{JSON.stringify(meta, null, 2)}</pre>
      <pre style={{ fontSize: '12px' }}>{JSON.stringify(record, null, 2)}</pre>
      {/* <pre>{JSON.stringify(record, null, 2)}</pre> */}
    </>
  );
}
