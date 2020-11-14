import React from 'react';
import ListView from './ListView';
import DateDetails from './DateDetails';
import { useHistory } from 'react-router-dom';
import SegmentNav, { SegmentNavEl } from './SegmentNav';
import AppHeader from './AppHeader';
import WidgetReporting from './WidgetReporting';
import WidgetInputDate from './WidgetInputDate';
import Calendar from './Calendar';
import { getRecordsByMonth } from '../utils/dataHelpers.js';
import Clock from './Clock';
import Dashboard from './Dashboard';

export default function View({
  inputDate,
  settings,
  changeMonth,
  changeDate,
  records = [],
  setInputDate,
  jobs = [],
  clock,
  initialState = { activeSegement: 'Calendar' },
  children
}) {
  const segements = ['Calendar', 'List'];
  const [state, setState] = React.useState(initialState);

  const monthRecords = getRecordsByMonth({
    records,
    date: clock.today
  });

  function handleDateClick(e) {
    setInputDate(new Date(e.currentTarget.parentElement.dataset.dateString));
  }

  React.useEffect(() => {
    // console.log('clock', latestRecord);
  }, [clock]);

  const Views = {
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
      <div className="app-body">{Views[state.activeSegement]}</div>
      {children}
    </div>
  );
}
