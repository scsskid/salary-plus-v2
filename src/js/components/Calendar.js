import React from 'react';
import { useHistory } from 'react-router-dom';
import CalendarBody from './CalendarBody.js';
import CalendarHead from './CalendarHead.js';
import CalendarControls from './CalendarControls.js';
import { pad, getTimeOfDate } from '../utils/helpers.js';

function Calendar({ inputDate, changeMonth, updateInputDate, records, jobs }) {
  const monthRecords = getRecordsByMonth({
    records,
    inputDate
  });

  const dateRecords = getRecordsByDate({
    records: monthRecords,
    inputDate
  });

  return (
    <div className="calendar">
      <h1>Calendar</h1>
      <p>
        <code>
          inputDate:{` `}
          {`${inputDate.getFullYear()}-${pad(inputDate.getMonth() + 1)}-${pad(
            inputDate.getDate()
          )}`}
        </code>
      </p>
      <CalendarControls changeMonth={changeMonth} />
      <table className="calendar-table">
        <CalendarHead />
        <CalendarBody
          inputDate={inputDate}
          records={monthRecords}
          updateInputDate={updateInputDate}
        />
      </table>
      <DateDetails
        inputDate={inputDate}
        jobs={jobs}
        dateRecords={dateRecords}
      />
    </div>
  );
}

const getRecordsByDate = ({ records, inputDate }) => {
  return records.filter((record) => {
    const beginDate = new Date(record.begin);
    return (
      beginDate.getDate() === inputDate.getDate() &&
      beginDate.getMonth() === inputDate.getMonth() &&
      beginDate.getFullYear() === inputDate.getFullYear()
    );
  });
};

function getRecordsByMonth({ records, inputDate }) {
  return records.filter((record) => {
    const beginDate = new Date(record.begin);
    return (
      beginDate.getMonth() === inputDate.getMonth() &&
      beginDate.getFullYear() === inputDate.getFullYear()
    );
  });
}

export default Calendar;

function DateDetails({ dateRecords, jobs }) {
  let content = [];

  dateRecords.forEach((record) => {
    content.push(
      <DateDetailsEntry
        key={`record-details-${record.id}`}
        record={record}
        jobs={jobs}
      />
    );
  });

  return <div className="date-details">{content}</div>;
}

function DateDetailsEntry({ record, jobs }) {
  const job = jobs.find((job) => job.id == record.jobId);
  const history = useHistory();
  function handleClick() {
    history.push(`/records/${record.id}`);
  }
  return (
    <>
      <div className="date-details-entry">
        <button data-record-id={record.id} onClick={handleClick}>
          <p>
            {getTimeOfDate(record.begin)}
            <br />
            {getTimeOfDate(record.end)}
          </p>
          <p>
            {job.name} (current rate: {job.rate})
            <br />
            Recorded Rate: {record.rate}
          </p>
        </button>
      </div>
      <pre>{JSON.stringify(record, null, 2)}</pre>
      <hr />
    </>
  );
}
