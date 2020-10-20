import React from 'react';
import { useHistory } from 'react-router-dom';
import { getLocaleTimeString } from '../utils/helpers';
import { getTimeElapsed, timeToDecimal } from '../utils/date-fns';

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

  return (
    <>
      <button
        className="date-details-entry"
        data-record-id={record.id}
        onClick={handleClick}
      >
        <div className="date-details-entry-time">
          {time.begin}
          <br />
          {time.end}
        </div>
        <div className="date-details-entry-content">
          {record.jobName} (current rate:{' '}
          {job ? job.rate : 'Job not found / was deleted'})
          <br />
          Recorded Rate: {record.rate}
          <br />
          {salaryOfShift(record)}
        </div>
      </button>

      {/* <pre>{JSON.stringify(record, null, 2)}</pre> */}
      <hr />
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
