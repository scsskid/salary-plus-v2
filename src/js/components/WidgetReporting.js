import * as React from 'react';
import FigureEarned from './FigureEarned';
import FigureHoursElapsed from './FigureHoursElapsed';
import { useHistory } from 'react-router-dom';

export default function WidgetReporting({ records }) {
  const history = useHistory();

  return (
    <button
      className="widget-reporting"
      onClick={() => {
        history.push('/reports');
      }}
    >
      <div className="widget-reporting-figures">
        <figure className="widget-reporting-figures-el">
          <FigureHoursElapsed records={records} />

          <figcaption>Hours</figcaption>
        </figure>
        <figure className="widget-reporting-figures-el">
          <b>
            <FigureEarned records={records} />
          </b>
          <figcaption>Earned</figcaption>
        </figure>
      </div>
    </button>
  );
}
