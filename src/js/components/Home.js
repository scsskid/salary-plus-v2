import React from 'react';
import InputDateControl from './InputDateControl';
import Calendar from './Calendar';
import ListView from './ListView';
import CalendarHead from './CalendarHead';
import CalendarBody from './CalendarBody';
import DateDetails from './DateDetails';
import CalendarTable from './CalendarTable';
import SegmentNav, { SegmentNavEl } from './SegmentNav';

export default function Home({
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

  function handleSegmentNavElClick() {
    console.dir(event.target.id);
    setState({ activeSegement: event.target.id });
  }

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
    <div className="home">
      <InputDateControl
        inputDate={inputDate}
        changeMonth={changeMonth}
        settings={settings}
      />
      <SegmentNav>
        {segements.map((segment, i) => (
          <SegmentNavEl
            id={segment}
            key={i}
            isActive={state.activeSegement === segment ? true : false}
            onClick={handleSegmentNavElClick}
          >
            {segment}
          </SegmentNavEl>
        ))}
      </SegmentNav>
      {Views[state.activeSegement]}
    </div>
  );
}
