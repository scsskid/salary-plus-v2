import React from 'react';
import { useHistory } from 'react-router-dom';
import CalendarBody from './CalendarBody.js';
import CalendarControls from './CalendarControls.js';
import { getIntlDateTimeFormat, getWeekDayNames } from '../utils/helpers.js';

function Calendar({
  inputDate,
  changeMonth,
  updateInputDate,
  records,
  jobs,
  settings
}) {
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
        <b>
          {inputDate.toLocaleDateString(undefined, {
            month: 'long',
            timeZone: settings.timeZone
          })}
        </b>
        <br />
        {inputDate.getFullYear()}
      </p>
      <CalendarControls changeMonth={changeMonth} />
      <table className="calendar-table">
        <CalendarHead settings={settings} />
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
        settings={settings}
      />
    </div>
  );
}

function DateDetails({ dateRecords, jobs, settings }) {
  let content = [];

  dateRecords.forEach((record) => {
    content.push(
      <DateDetailsEntry
        key={`record-details-${record.id}`}
        record={record}
        jobs={jobs}
        settings={settings}
      />
    );
  });

  return <div className="date-details">{content}</div>;
}

function DateDetailsEntry({ record, jobs, settings }) {
  const job = jobs.find((job) => job.id == record.jobId);
  const history = useHistory();
  const time = {
    begin: new Date(record.begin).toLocaleTimeString(undefined, {
      timeZone: 'Europe/Berlin',
      hour: '2-digit',
      minute: '2-digit'
    }),
    end: new Date(record.end).toLocaleTimeString(undefined, {
      timeZone: 'Europe/Berlin',
      hour: '2-digit',
      minute: '2-digit'
    })
  };

  const intl = getIntlDateTimeFormat(new Date(record.begin), {
    timeZone: settings.timeZone,
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });

  function handleClick() {
    history.push(`/records/${record.id}`);
  }

  return (
    <>
      <div className="date-details-entry">
        <button data-record-id={record.id} onClick={handleClick}>
          <p>{intl}</p>
          <p>
            {time.begin}
            <br />
            {time.end}
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

function CalendarHead({ settings }) {
  let cells = [];
  for (let i = 0; i < 7; i++) {
    cells.push(
      <td key={`weekday-headcell-${i}`}>
        {getWeekDayNames({ format: 'short', locale: settings.locale })[i]}
      </td>
    );
  }

  return (
    <thead>
      <tr>{cells}</tr>
    </thead>
  );
}
