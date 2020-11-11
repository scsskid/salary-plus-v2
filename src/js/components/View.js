import React from 'react';
import ListView from './ListView';
import DateDetails from './DateDetails';
import SegmentNav, { SegmentNavEl } from './SegmentNav';
import AppHeader from './AppHeader';
import WidgetReporting from './WidgetReporting';
import WidgetInputDate from './WidgetInputDate';
import Week from './Week';
import Calendar from './Calendar';
import { getWeekStartDateOffset } from '../utils/helpers.js';

export default function View({
  inputDate,
  settings,
  changeMonth,
  changeDate,
  records,
  setInputDate,
  jobs,
  initialState = { activeSegement: 'Week' }
}) {
  const segements = ['Week', 'Month', 'List'];
  const [state, setState] = React.useState(initialState);

  function handleDateClick(e) {
    setInputDate(new Date(e.currentTarget.parentElement.dataset.dateString));
  }

  // for week

  const currentDate = new Date(inputDate.getTime());
  const weekStartOffset = getWeekStartDateOffset(currentDate);
  currentDate.setDate(weekStartOffset);

  const Views = {
    Week: (
      <div>
        <Week
          inputDate={inputDate}
          dateWalker={currentDate}
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
          inputDate={inputDate}
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
        <WidgetReporting records={records} />
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
        <WidgetInputDate
          inputDate={inputDate}
          settings={settings}
          changeMonth={changeMonth}
          setInputDate={setInputDate}
          type={state.activeSegement.toLowerCase()}
          changeDate={changeDate}
        />

        {Views[state.activeSegement]}
      </div>
    </div>
  );
}
