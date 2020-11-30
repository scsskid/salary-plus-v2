import * as React from 'react';
import RecordsList from './RecordsList';
import Week from './Week';
import Weekdays from './Weekdays';
import WidgetReporting from './WidgetReporting';
import useClock from '../hooks/useClock';
import { getRecordsByRange, getRecordsByMonth } from '../utils/dataHelpers.js';
import { isSameDay } from '../utils/helpers.js';
import { Link } from 'react-router-dom';

export default function Dashboard({ jobs, settings, records, setInputDate }) {
  const clock = useClock();

  const monthRecords = getRecordsByMonth({
    records,
    date: clock.today
  });

  const beforeTodayRecords = getRecordsByRange(records, {
    start: new Date('1900'),
    end: clock.today
  })
    .sort(function sortByDateDesc(a, b) {
      return new Date(b.end) - new Date(a.end);
    })
    .splice(0, 1);

  const todayRecords = records.filter((record) =>
    isSameDay(new Date(record.begin), clock.today)
  );

  const next7DaysRecords = getRecordsByRange(records, {
    start: new Date(clock.today.getTime() + 24 * 60 * 60 * 1000),
    end: new Date(clock.today.getTime() + 8 * 24 * 60 * 60 * 1000)
  });

  console.log(beforeTodayRecords);

  function addJobNudge() {
    if (!jobs.length) {
      return (
        <>
          <p>No Jobs found.</p>
          <p>
            {"It's"} recommended to add a job to enable more flexible reporting
            and mass-organize your past records in future updates.{' '}
            <Link to="/jobs/add">add a job</Link>
          </p>
        </>
      );
    }
  }

  if (!records.length) {
    return (
      <div className="view-dashboard | view-component">
        <p>No data to display.</p>
        <p>
          <Link to="/records/add">Add a record</Link>
        </p>
        {addJobNudge()}
      </div>
    );
  }

  return (
    <>
      <div className="view-dashboard | view-component">
        <div className="view-dashboard-reporting">
          <h2>
            Earned{' '}
            {clock.today.toLocaleDateString(settings.language, {
              month: 'long',
              year: 'numeric'
            })}
          </h2>
          <WidgetReporting
            records={monthRecords}
            figures={['dates', 'hours', 'earned']}
            settings={settings}
            inputDate={clock.today}
            setInputDate={setInputDate}
          />
          <p style={{ textAlign: 'right' }}>
            <Link to="/reporting">Full Report →</Link>
          </p>
        </div>
        {todayRecords.length > 0 && (
          <div className="view-dashboard-ongoing">
            <h2>Today</h2>
            <RecordsList
              jobs={jobs}
              settings={settings}
              records={todayRecords}
              hideDates={true}
            />
          </div>
        )}

        {beforeTodayRecords.length > 0 && (
          <div className="view-dashboard-recent">
            <h2>before Today</h2>

            <RecordsList
              jobs={jobs}
              settings={settings}
              records={beforeTodayRecords}
            />
          </div>
        )}
        <div className="view-dashboard-upcoming">
          <h2>Upcoming</h2>
          <div className="view-dashboard-upcoming-week">
            <Weekdays dayStart={clock.today.getDay() + 1} settings={settings} />
            <Week
              records={records}
              inputDate={new Date(clock.today.getTime() + 24 * 60 * 60 * 1000)}
              jobs={jobs}
            />
          </div>
          <div className="view-dashboard-upcoming-list">
            <RecordsList
              jobs={jobs}
              settings={settings}
              records={next7DaysRecords}
            />
          </div>
        </div>
      </div>
    </>
  );
}
