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
  const segements = [{ name: 'Week' }, { name: 'Month' }, { name: 'List' }];
  const [state, setState] = React.useState({ activeSegement: 0 });

  function handleSegmentNavElClick() {
    console.dir(event.target.id);
    setState({ activeSegement: parseInt(event.target.id) });
  }

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
            id={i}
            key={i}
            isActive={state.activeSegement === i ? true : false}
            onClick={handleSegmentNavElClick}
          >
            {segment.name}
          </SegmentNavEl>
        ))}
      </SegmentNav>
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
      <ListView
        jobs={jobs}
        settings={settings}
        inputDate={inputDate}
        monthRecords={monthRecords}
        daysInMonth={daysInMonth}
      />
    </div>
  );
}
