import * as React from 'react';
import FigureEarned from './FigureEarned';
import FigureHours from './FigureHours';
import { useHistory } from 'react-router-dom';

export default function WidgetReporting({ records, figures = [], settings }) {
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
              <FigureHours records={records} settings={settings} />
            </b>
            <figcaption>Hours</figcaption>
          </figure>
        )}
        {figures.includes('earned') && (
          <figure className="widget-reporting-figures-el">
            <b>
              <FigureEarned records={records} settings={settings} />
            </b>
            <figcaption>Earned</figcaption>
          </figure>
        )}
      </div>
    </button>
  );
}
