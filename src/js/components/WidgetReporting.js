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
    <button
      className="widget-reporting"
      onClick={() => {
        setInputDate(inputDate);
        history.push('/view/reporting');
      }}
    >
      <div className="widget-reporting-figures">
        {figures.includes('dates') && (
          <figure className="widget-reporting-figures-el">
            <b>{records.length}</b>
            <figcaption>Dates</figcaption>
          </figure>
        )}
        {figures.includes('hours') && (
          <figure className="widget-reporting-figures-el">
            <b>
              <FigureHours
                value={r.getWorkedHours(records)}
                settings={settings}
              />
            </b>
            <figcaption>Hours</figcaption>
          </figure>
        )}
        {figures.includes('earned') && (
          <figure className="widget-reporting-figures-el">
            <b>
              {' '}
              <FigureEarned
                value={r.getWorkedHoursEarned(records)}
                settings={settings}
              />
            </b>
            <figcaption>
              Earned (
              <FigureEarned
                value={r.getWorkedHoursWithoutOvertimeEarned(records)}
                settings={settings}
              />
              +{' '}
              <FigureEarned
                value={r.getOvertimeEarned(records)}
                settings={settings}
              />
              )
            </figcaption>
          </figure>
        )}
      </div>
    </button>
  );
}
