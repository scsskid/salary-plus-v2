import * as React from 'react';
import RecordsList from './RecordsList';
import Week from './Week';
import Weekdays from './Weekdays';
import WidgetReporting from './WidgetReporting';
import useClock from '../hooks/useClock';
import { getRecordsByRange, getRecordsByMonth } from '../utils/dataHelpers.js';
import {
  deltaDate,
  getFirstDateOfMonthDate,
  getWeekStartDateOffset
} from '../utils/date-fns.js';
import { isSameDay } from '../utils/helpers.js';
import { Link } from 'react-router-dom';
import ScrollToTopOnMount from './ScrollToTopOnMount';
import { getWeekStartDate } from '../utils/date-fns.js';

export default function Dashboard({
  jobs,
  settings,
  records,
  setInputDate,
  inputDate
}) {
  ScrollToTopOnMount();
  const clock = useClock();
  const widgetReportingTargetDate = clock.today;
  const firstDateOfCurrentMonth = getFirstDateOfMonthDate(clock.today); // set to deltaDate
  const firstDateOfCurrentWeek = getWeekStartDate(clock.today);

  const monthRecords = getRecordsByMonth({
    records,
    date: widgetReportingTargetDate
  });

  const lastThreeMonthsRecords = getRecordsByRange(records, {
    start: deltaDate(firstDateOfCurrentMonth, -3, 'months'),
    end: firstDateOfCurrentMonth
  });

  const currentYearRecords = getRecordsByRange(records, {
    start: new Date(`${clock.today.getFullYear()}-01-01`),
    end: new Date(`${clock.today.getFullYear() + 1}-01-01`)
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

  React.useEffect(() => {
    // console.log(inputDate);
    // console.log(getWeekStartDateOffset(inputDate));
    // console.log(getWeekStartDate(inputDate));
  }, []);

  return (
    <>
      <div className="view-dashboard | view-component">
        <div className="view-dashboard-reporting">
          <header className="section-header">
            <h2>Stats</h2>
            <p>
              {widgetReportingTargetDate.toLocaleDateString(settings.language, {
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </header>
          <WidgetReporting
            records={monthRecords}
            figures={['hours', 'earned', 'overtimeHours', 'overtimeEarned']}
            settings={settings}
            inputDate={clock.today}
            setInputDate={setInputDate}
          />
          <p style={{ textAlign: 'right' }}>
            <Link to="/view/reporting">Full Report →</Link>
          </p>
        </div>

        {/* {todayRecords.length > 0 && (
          <div className="view-dashboard-ongoing">
            <h2>Today</h2>
            <RecordsList
              jobs={jobs}
              settings={settings}
              records={todayRecords}
              hideDates={true}
            />
          </div>
        )} */}

        {/* {beforeTodayRecords.length > 0 && (
          <div className="view-dashboard-recent">
            <h2>Most Recent</h2>

            <RecordsList
              jobs={jobs}
              settings={settings}
              records={beforeTodayRecords}
            />
          </div>
        )} */}

        <div className="view-dashboard-upcoming">
          <h2>Upcoming</h2>
          {inputDate.toString()}
          <br />
          {new Date().toString()}
          <div className="view-dashboard-upcoming-week">
            <Weekdays dayStart={0} settings={settings} />
            <Week
              records={records}
              startDate={new Date(getWeekStartDate(inputDate).getTime())}
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
