import React from 'react';
import ListView from './ListView';
import DateDetails from './DateDetails';
import SegmentNav, { SegmentNavEl } from './SegmentNav';
import AppHeader from './AppHeader';
import WidgetReporting from './WidgetReporting';
import WidgetInputDate from './WidgetInputDate';
import Week from './Week';
import Calendar from './Calendar';
import { getWeekStartDate } from '../utils/helpers.js';
import Weekdays from './Weekdays';
import {
  getRecentRecords,
  getRecordsByRange,
  getPastRecords,
  getRecordsByMonth
} from '../utils/dataHelpers.js';
import Clock from './Clock';
import { useClock } from '../utils/hooks';
import { isSameDay } from '../utils/helpers.js';

export default function View({
  inputDate,
  settings,
  changeMonth,
  changeDate,
  records = [],
  setInputDate,
  jobs = [],
  clock,
  initialState = { activeSegement: 'Calendar' }
}) {
  const segements = ['Dashboard', 'Calendar', 'List'];
  const [state, setState] = React.useState(initialState);

  const monthRecords = getRecordsByMonth({
    records,
    date: clock.today
  });

  const latestRecord = getRecordsByRange(
    records,
    {
      start: new Date('1900'),
      end: clock.now
    },
    true
  )
    .sort(function sortByDateDesc(a, b) {
      return new Date(b.begin) - new Date(a.begin);
    })
    .splice(0, 1);

  const todayRecords = records.filter((record) =>
    isSameDay(new Date(record.begin), clock.today)
  );

  console.log(todayRecords);

  const next7DaysRecords = getRecordsByRange(records, {
    start: new Date(clock.today.getTime() + 24 * 60 * 60 * 1000),
    end: new Date(clock.today.getTime() + 7 * 24 * 60 * 60 * 1000)
  });

  function handleDateClick(e) {
    setInputDate(new Date(e.currentTarget.parentElement.dataset.dateString));
  }

  React.useEffect(() => {
    // console.log('clock', latestRecord);
  }, [clock]);

  const Views = {
    Dashboard: (
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
          <ListView jobs={jobs} settings={settings} records={todayRecords} />
        </div>

        <div className="view-dashboard-recent">
          <h2>Most Recent</h2>
          <ListView jobs={jobs} settings={settings} records={latestRecord} />
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
    ),
    Week: (
      <div>
        <Week
          inputDate={inputDate}
          dateWalker={getWeekStartDate(inputDate)}
          records={records}
          bleedMonth="true"
        />
      </div>
    ),
    Calendar: (
      <div className="view-calendar | view-component">
        <div className="view-calendar-controls">
          <WidgetInputDate
            inputDate={inputDate}
            settings={settings}
            changeMonth={changeMonth}
            setInputDate={setInputDate}
            type={state.activeSegement.toLowerCase()}
            changeDate={changeDate}
          />
        </div>
        <Calendar
          inputDate={inputDate}
          settings={settings}
          handleDateClick={handleDateClick}
          setInputDate={setInputDate}
          records={records}
        />
        <DateDetails
          date={inputDate}
          jobs={jobs}
          records={records}
          settings={settings}
        />
      </div>
    ),
    List: (
      <div className="view-list | view-component">
        <WidgetInputDate
          inputDate={inputDate}
          settings={settings}
          changeMonth={changeMonth}
          setInputDate={setInputDate}
          type={state.activeSegement.toLowerCase()}
          changeDate={changeDate}
        />
        <ListView
          jobs={jobs}
          settings={settings}
          inputDate={inputDate}
          records={monthRecords}
        />
      </div>
    )
  };

  return (
    <div className="view">
      <AppHeader>
        <h1>View</h1>
        <Clock />
        {['Off', ''].includes(state.activeSegement) && (
          <WidgetReporting
            records={monthRecords}
            figures={['hours', 'earned']}
          />
        )}
      </AppHeader>

      <SegmentNav>
        {segements.map((segment, i) => (
          <SegmentNavEl
            id={segment}
            key={i}
            isActive={state.activeSegement === segment ? true : false}
            onClick={(event) =>
              setState({ activeSegement: event.currentTarget.id })
            }
          >
            <b>{segment}</b>
          </SegmentNavEl>
        ))}
      </SegmentNav>
      <div className="app-body">{Views[state.activeSegement]}</div>
    </div>
  );
}
