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
  getPastRecords
} from '../utils/dataHelpers.js';

export default function View({
  inputDate,
  settings,
  changeMonth,
  changeDate,
  records,
  monthRecords,
  setInputDate,
  jobs,
  todayDate,
  initialState = { activeSegement: 'Dashboard' }
}) {
  const segements = ['Dashboard', 'Calendar', 'List'];
  const [state, setState] = React.useState(initialState);

  const weekRange = {
    start: new Date(todayDate),
    end: new Date(todayDate.getTime() + 7 * 24 * 60 * 60 * 1000)
  };

  const latestRecord = getRecentRecords(getPastRecords(records), 1, todayDate);

  function handleDateClick(e) {
    setInputDate(new Date(e.currentTarget.parentElement.dataset.dateString));
  }

  // todayDate = new Date('2020-06-06'); // doest update week or list view?

  const Views = {
    Dashboard: (
      <div className="view-dashboard | view-component">
        <div className="view-dashboard-reporting">
          <WidgetReporting
            records={monthRecords}
            figures={['dates', 'hours', 'earned']}
          />
        </div>
        <div className="view-dashboard-recent">
          <h2>3 days ago / yesterday</h2>
          <ListView jobs={jobs} settings={settings} records={latestRecord} />
        </div>

        <div className="view-dashboard-upcoming">
          <h2>Upcoming</h2>
          <div className="view-dashboard-upcoming-week">
            <Weekdays dayStart={todayDate.getDay()} settings={settings} />
            <Week records={records} />
          </div>
          <div className="view-dashboard-upcoming-list">
            <ListView
              jobs={jobs}
              settings={settings}
              records={getRecordsByRange(records, weekRange)}
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
