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

export default function View({
  inputDate,
  settings,
  changeMonth,
  changeDate,
  records,
  monthRecords,
  setInputDate,
  jobs,
  initialState = { activeSegement: 'Dashboard' }
}) {
  const segements = ['Dashboard', 'Month', 'List'];
  const [state, setState] = React.useState(initialState);

  function handleDateClick(e) {
    setInputDate(new Date(e.currentTarget.parentElement.dataset.dateString));
  }

  const Views = {
    Dashboard: <div>Dashboard</div>,
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
    Month: (
      <>
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
      </>
    ),
    List: (
      <ListView
        jobs={jobs}
        settings={settings}
        inputDate={inputDate}
        records={records}
      />
    )
  };

  return (
    <div className="view">
      <AppHeader>
        <h1>View</h1>
        <WidgetReporting records={monthRecords} />
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
      <div className="app-body">
        {state.activeSegement !== 'Dashboard' && (
          <WidgetInputDate
            inputDate={inputDate}
            settings={settings}
            changeMonth={changeMonth}
            setInputDate={setInputDate}
            type={state.activeSegement.toLowerCase()}
            changeDate={changeDate}
          />
        )}
        {Views[state.activeSegement]}
      </div>
    </div>
  );
}
