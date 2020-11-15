import React from 'react';
import ListView from './ListView';
import Week from './Week';
import Weekdays from './Weekdays';
import WidgetReporting from './WidgetReporting';
import { useClock } from '../utils/hooks';
import { getRecordsByRange, getRecordsByMonth } from '../utils/dataHelpers.js';
import { isSameDay } from '../utils/helpers.js';

export default function Dashboard({ jobs, settings, records, children }) {
  const clock = useClock();

  const monthRecords = getRecordsByMonth({
    records,
    date: clock.today
  });

  const reocordsBeforeToday = getRecordsByRange(records, {
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

  return (
    <>
      {children}
      <div className="view-dashboard | view-component">
        <div className="view-dashboard-reporting">
          <h2>
            Earned{' '}
            {clock.today.toLocaleDateString('de-DE', {
              month: 'long',
              year: 'numeric'
            })}
          </h2>
          <WidgetReporting
            records={monthRecords}
            figures={['dates', 'hours', 'earned']}
          />
        </div>
        <div className="view-dashboard-ongoing">
          <h2>Today</h2>
          <ListView
            jobs={jobs}
            settings={settings}
            records={todayRecords}
            hideDates={true}
          />
        </div>

        <div className="view-dashboard-recent">
          <h2>before Today</h2>
          <ListView
            jobs={jobs}
            settings={settings}
            records={reocordsBeforeToday}
          />
        </div>

        <div className="view-dashboard-upcoming">
          <h2>Upcoming</h2>
          <div className="view-dashboard-upcoming-week">
            <Weekdays dayStart={clock.today.getDay() + 1} settings={settings} />
            <Week
              records={records}
              inputDate={new Date(clock.today.getTime() + 24 * 60 * 60 * 1000)}
            />
          </div>
          <div className="view-dashboard-upcoming-list">
            <ListView
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
