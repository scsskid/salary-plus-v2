import React from 'react';
import InputDateControl from './InputDateControl';
import ListView from './ListView';
import DateDetails from './DateDetails';
import SegmentNav, { SegmentNavEl } from './SegmentNav';
import InputDateDisplay from './InputDateDisplay';
import RecordsCalendar from './RecordsCalendar';
import { useHistory } from 'react-router-dom';
import FigureHoursElapsed from './FigureHoursElapsed';
import FigureEarned from './FigureEarned';

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
  const history = useHistory();

  const Views = {
    Week: <div>W E E K</div>,
    Month: (
      <>
        <RecordsCalendar
          inputDate={inputDate}
          records={monthRecords}
          setInputDate={setInputDate}
          settings={settings}
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
    <div className="view main-component">
      <header className="view-header component-header">
        <div className="component-meta">
          <h1>View</h1>
          {/* {state.activeSegement} */}
        </div>

        <button
          className="widget-reporting"
          onClick={() => {
            history.push('/reports');
          }}
        >
          {/* <header className="widget-reporting-figures">
            <div>[Month] Report →</div>
          </header> */}
          <div className="widget-reporting-figures">
            <figure className="widget-reporting-figures-el">
              <b>
                <FigureHoursElapsed records={monthRecords} />
              </b>
              <figcaption>Hours</figcaption>
            </figure>
            <figure className="widget-reporting-figures-el">
              <b>
                <FigureEarned records={monthRecords} />
              </b>
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
        <header className="component-body-header">
          <InputDateDisplay inputDate={inputDate} settings={settings} />
          <InputDateControl changeMonth={changeMonth} />
        </header>
        {Views[state.activeSegement]}
      </div>
    </div>
  );
}
