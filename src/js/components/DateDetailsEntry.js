import React from 'react';
import { useHistory } from 'react-router-dom';
import { getLocaleTimeString, round } from '../utils/helpers';
import { getTimeElapsed, timeToDecimal } from '../utils/date-fns';

export default function DateDetailsEntry({ record, jobs }) {
  const job = jobs.find((job) => job.id == record.jobId);
  const history = useHistory();
  const time = {
    begin: getLocaleTimeString(new Date(record.begin)),
    end: getLocaleTimeString(new Date(record.end))
  };

  // HH:mm
  // var timeElapsed = getTimeElapsed(
  //   new Date(record.end) - new Date(record.begin)
  // );

  // 1,000000011H
  function getHoursElapsed(duration) {
    return duration / (1000 * 60 * 60);
  }

  const hoursElapsed = getHoursElapsed(
    new Date(record.end) - new Date(record.begin)
  );

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
            {record.jobName} {job ? '' : '⚠️ Job not found / was deleted'}
          </h2>

          <p className="date-details-entry-meta">
            {/* {timeElapsed} / */}
            {/* Todo: Duration String: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time  */}{' '}
            <span>{salaryOfShift(record)}</span>{' '}
            <span>{round(hoursElapsed)}h</span>
            {record.sickLeave && <span> [sick]</span>}
            {/* / Recorded Rate:{record.rate} */}
          </p>
        </div>
      </button>

      {/* <pre>{JSON.stringify(record, null, 2)}</pre> */}
    </>
  );
}

function salaryOfShift(record) {
  var timeElapsed = getTimeElapsed(
    new Date(record.end) - new Date(record.begin)
  );
  var earnedNumber = timeToDecimal(timeElapsed) * record.rate;
  var earned = new Intl.NumberFormat([], {
    style: 'currency',
    currency: 'EUR'
  }).format(earnedNumber);
  return earned;
}
