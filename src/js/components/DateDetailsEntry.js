import React from 'react';
import { useHistory } from 'react-router-dom';
import { getLocaleTimeString, round } from '../utils/helpers';
import { getHoursElapsed } from '../utils/date-fns';
import { getEarned } from '../utils/reporting-fns';

export default function DateDetailsEntry({ record, jobs }) {
  const job = jobs.find((job) => job.id == record.jobId);
  const history = useHistory();
  const time = {
    begin: getLocaleTimeString(new Date(record.begin)),
    end: getLocaleTimeString(new Date(record.end))
  };

  const hoursElapsed = getHoursElapsed(
    new Date(record.end) - new Date(record.begin)
  );

  const earned = new Intl.NumberFormat([], {
    style: 'currency',
    currency: 'EUR'
  }).format(getEarned(record));

  function handleClick() {
    history.push(`/records/${record.id}`);
  }

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
            <span>{earned}</span> <span>{round(hoursElapsed, 2)}h</span>
            {record.sickLeave && <span> [sick]</span>}
          </p>
        </div>
      </button>

      {/* <pre>{JSON.stringify(record, null, 2)}</pre> */}
    </>
  );
}
