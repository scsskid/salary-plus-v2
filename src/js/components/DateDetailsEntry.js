import React from 'react';
import { useHistory } from 'react-router-dom';
import { getLocaleTimeString } from '../utils/helpers';

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
          {job.name} (current rate: {job.rate})
          <br />
          Recorded Rate: {record.rate}
        </div>
      </button>

      {/* <pre>{JSON.stringify(record, null, 2)}</pre> */}
      <hr />
    </>
  );
}
