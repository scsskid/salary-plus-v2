import * as React from 'react';
import FigureEarned from './FigureEarned';
import FigureHoursElapsed from './FigureHoursElapsed';
import { useHistory } from 'react-router-dom';

export default function WidgetReporting({ records, figures = [] }) {
  const history = useHistory();

  return (
    <button
      className="widget-reporting"
      onClick={() => {
        history.push('/reporting');
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
              <FigureHoursElapsed records={records} />
            </b>
            <figcaption>Hours</figcaption>
          </figure>
        )}
        {figures.includes('earned') && (
          <figure className="widget-reporting-figures-el">
            <b>
              <FigureEarned records={records} />
            </b>
            <figcaption>Earned</figcaption>
          </figure>
        )}
      </div>
    </button>
  );
}
