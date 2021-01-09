import * as React from 'react';
import { useHistory } from 'react-router-dom';
import FigureHours from './FigureHours';
import FigureEarned from './FigureEarned';
import * as r from './../utils/reporting-fns';

export default function WidgetReporting({
  records,
  figures = [],
  settings,
  inputDate,
  setInputDate
}) {
  const history = useHistory();
  // const clock = useClock();

  return (
    <div
      className="widget-reporting"
      // onClick={() => {
      //   setInputDate(inputDate);
      //   history.push('/view/reporting');
      // }}
    >
      <div className="widget-reporting-figures">
        {figures.includes('dates') && (
          <figure className="widget-reporting-figures-el">
            <figcaption>Dates</figcaption>
            <b>{records.length}</b>
          </figure>
        )}
        {figures.includes('hours') && (
          <figure className="widget-reporting-figures-el">
            <figcaption>Hours</figcaption>
            <b>
              <FigureHours
                value={r.getWorkedHours(records)}
                settings={settings}
              />
            </b>
          </figure>
        )}
        {figures.includes('earned') && (
          <figure className="widget-reporting-figures-el">
            <figcaption>Earned</figcaption>
            <b>
              <FigureEarned
                value={r.getWorkedHoursWithoutOvertimeEarned(records)}
                settings={settings}
              />
            </b>
          </figure>
        )}
        {figures.includes('overtimeHours') ? (
          <figure className="widget-reporting-figures-el">
            <figcaption>Overtime</figcaption>
            <b>
              <FigureHours
                value={r.getOvertimeHours(records)}
                settings={settings}
              />
            </b>
          </figure>
        ) : null}
        {figures.includes('overtimeEarned') ? (
          <figure className="widget-reporting-figures-el">
            <figcaption>Overtime Value</figcaption>
            <b>
              <FigureEarned
                value={r.getOvertimeEarned(records)}
                settings={settings}
              />
            </b>
          </figure>
        ) : null}
      </div>
    </div>
  );
}
