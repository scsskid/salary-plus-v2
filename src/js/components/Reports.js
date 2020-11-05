import React from 'react';
import InputDateControl from './InputDateControl';
import SegmentNav, { SegmentNavEl } from './SegmentNav';
import InputDateDisplay from './InputDateDisplay';
import FigureHoursElapsed from './FigureHoursElapsed';
import FigureEarned from './FigureEarned';

export default function Reports({
  inputDate,
  settings,
  changeMonth,
  monthRecords
}) {
  const segements = ['Week', 'Month', 'Custom'];
  const [state, setState] = React.useState({ activeSegement: 'Month' });

  const Views = {
    Week: <div>W E E K</div>,
    Month: (
      <>
        <h2>M O N T H</h2>
        <div>Records: {monthRecords.length}</div>
        <div>
          Hours: <FigureHoursElapsed records={monthRecords} />
        </div>
        <div>
          Earned: <FigureEarned records={monthRecords} />
        </div>
      </>
    ),
    Custom: <p>C U S T O M</p>
  };

  return (
    <div className="reporting main-component">
      <header className="component-header">
        <div className="component-meta">
          <h1>Reporting</h1>
        </div>

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
        <header className="component-body-header">
          <InputDateDisplay inputDate={inputDate} settings={settings} />
          <InputDateControl changeMonth={changeMonth} />
        </header>
        {Views[state.activeSegement]}
      </div>
    </div>
  );
}
