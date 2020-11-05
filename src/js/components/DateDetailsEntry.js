import React from 'react';
import { useHistory } from 'react-router-dom';
import { getLocaleTimeString } from '../utils/helpers';
import FigureBonus from './FigureBonus';
import FigureEarned from './FigureEarned';
import FigureHoursElapsed from './FigureHoursElapsed';

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

      {/* <pre>{JSON.stringify(record, null, 2)}</pre> */}
    </>
  );
}
