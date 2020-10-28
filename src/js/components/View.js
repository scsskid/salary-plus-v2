import React from 'react';
import InputDateControl from './InputDateControl';
import Calendar from './Calendar';
import ListView from './ListView';
import CalendarHead from './CalendarHead';
import CalendarBody from './CalendarBody';
import DateDetails from './DateDetails';
import CalendarTable from './CalendarTable';
import SegmentNav, { SegmentNavEl } from './SegmentNav';
import InputDateDisplay from './InputDateDisplay';

export default function View({
  inputDate,
  settings,
  changeMonth,
  monthRecords,
  daysInMonth,
  updateInputDate,
  firstDay,
  jobs,
  dateRecords
}) {
  const segements = ['Week', 'Month', 'List'];
  const [state, setState] = React.useState({ activeSegement: 'Month' });

  const Views = {
    Week: <div>W E E K</div>,
    Month: (
      <Calendar>
        <CalendarTable>
          <CalendarHead settings={settings} />
          <CalendarBody
            inputDate={inputDate}
            records={monthRecords}
            updateInputDate={updateInputDate}
            daysInMonth={daysInMonth}
            firstDay={firstDay}
          />
        </CalendarTable>
        <DateDetails
          inputDate={inputDate}
          jobs={jobs}
          dateRecords={dateRecords}
          settings={settings}
        />
      </Calendar>
    ),
    List: (
      <ListView
        jobs={jobs}
        settings={settings}
        inputDate={inputDate}
        monthRecords={monthRecords}
        daysInMonth={daysInMonth}
      />
    )
  };

  return (
    <div className="view main-component">
      <header className="view-header component-header">
        <div className="component-meta">
          <h1>View</h1>
          {/* {state.activeSegement} */}
        </div>

        <button className="widget-reporting">
          <header className="widget-reporting-figures">
            <div>This [Month] →</div>
          </header>
          <div className="widget-reporting-figures">
            <figure className="widget-reporting-figures-el">
              <b>96,5</b>
              <figcaption>Hours</figcaption>
            </figure>
            <figure className="widget-reporting-figures-el">
              <b>352,10€</b>
              <figcaption>Earned</figcaption>
            </figure>
          </div>
        </button>

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
      </header>
      <div className="component-body">
        <InputDateDisplay inputDate={inputDate} settings={settings} />
        <InputDateControl
          inputDate={inputDate}
          changeMonth={changeMonth}
          settings={settings}
        />
        {Views[state.activeSegement]}
      </div>
    </div>
  );
}
