import React from 'react';
import InputDateControl from './InputDateControl';
import ListView from './ListView';
import DateDetails from './DateDetails';
import SegmentNav, { SegmentNavEl } from './SegmentNav';
import InputDateDisplay from './InputDateDisplay';
import AppHeader from './AppHeader';
import WidgetReporting from './WidgetReporting';
import WidgetInputDate from './WidgetInputDate';
import Week from './Week';
import Calendar from './Calendar';
import { useEvents } from '../utils/hooks';

export default function View({
  inputDate,
  settings,
  changeMonth,
  monthRecords,
  setInputDate,
  jobs,
  dateRecords
}) {
  const segements = ['Week', 'Month', 'List'];
  const [state, setState] = React.useState({ activeSegement: 'Month' });
  useEvents({ records: monthRecords, inputDate });

  function handleCalendarDateButtonClick(e) {
    setInputDate(new Date(e.currentTarget.parentElement.dataset.dateString));
  }

  const Views = {
    Week: (
      <div>
        <Week inputDate={inputDate} />
      </div>
    ),
    Month: (
      <>
        <Calendar
          inputDate={inputDate}
          settings={settings}
          onCalendarDateButtonClick={handleCalendarDateButtonClick}
        />
        <DateDetails
          inputDate={inputDate}
          jobs={jobs}
          dateRecords={dateRecords}
          settings={settings}
        />
      </>
    ),
    List: (
      <ListView
        jobs={jobs}
        settings={settings}
        inputDate={inputDate}
        monthRecords={monthRecords}
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
        <WidgetInputDate>
          <InputDateDisplay inputDate={inputDate} settings={settings} />
          <InputDateControl changeMonth={changeMonth} />
        </WidgetInputDate>
        {Views[state.activeSegement]}
      </div>
    </div>
  );
}
