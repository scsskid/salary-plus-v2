import React from 'react';
import SegmentNav, { SegmentNavEl } from './SegmentNav';
import FigureHoursElapsed from './FigureHoursElapsed';
import FigureEarned from './FigureEarned';
import FigureBonus from './FigureBonus';
import FigureTotals from './FigureTotals';
import AppHeader from './AppHeader';
import WidgetInputDate from './WidgetInputDate';

export default function Reports({
  inputDate,
  settings,
  changeMonth,
  records,
  initialState = { activeSegement: 'Week' }
}) {
  const segements = ['Week', 'Month', 'Custom'];
  const [state, setState] = React.useState(initialState);

  const Views = {
    Week: <div>W E E K</div>,
    Month: (
      <>
        <div>Records: {records.length}</div>

        <div className="table-reporting-container">
          {/* Table Header Helper */}
          <table className="table-reporting-helper-head">
            <colgroup>
              <col className="col-heading" />
              <col className="col-hours" />
              <col className="col-earned" />
            </colgroup>
            <thead>
              <tr>
                <td></td>
                <th>Hours</th>
                <th>Earned</th>
              </tr>
            </thead>
          </table>

          <table className="table-reporting">
            <colgroup>
              <col className="col-heading" />
              <col className="col-hours" />
              <col className="col-earned" />
            </colgroup>

            <tbody>
              <tr className="table-reporting-row">
                <th>Regular</th>
                <td>
                  <FigureHoursElapsed records={records} type="contract" />
                </td>
                <td>
                  <b>
                    <FigureEarned records={records} type="contract" />
                  </b>
                </td>
              </tr>
              <tr className="table-reporting-row">
                <th>Overtime</th>
                <td>
                  <FigureHoursElapsed records={records} type="overtime" />
                </td>
                <td>
                  <b>
                    <FigureEarned records={records} type="overtime" />
                  </b>
                </td>
              </tr>
            </tbody>
          </table>
          <p className="totals">
            Claimable Salary (
            <FigureHoursElapsed records={records} type="actual" /> hours)
            <b>
              <FigureEarned records={records} type="actual" />
            </b>{' '}
          </p>
          <table className="table-reporting">
            <colgroup>
              <col className="col-heading" />
              <col className="col-hours" />
              <col className="col-earned" />
            </colgroup>
            <tbody>
              <tr className="table-reporting-row">
                <th>Bonus / Tips</th>
                <td></td>
                <td>
                  <b>
                    <FigureBonus records={records} />
                  </b>
                </td>
              </tr>
            </tbody>
          </table>
          <p className="totals">
            Total{' '}
            <b>
              <FigureTotals records={records} />
            </b>
          </p>
        </div>
      </>
    ),
    Custom: <p>C U S T O M</p>
  };

  return (
    <div className="reporting main-component">
      <AppHeader>
        <h1>Reporting</h1>
      </AppHeader>
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

      <div className="app-body">
        <WidgetInputDate
          inputDate={inputDate}
          settings={settings}
          changeMonth={changeMonth}
          changeDate={changeMonth}
          type={state.activeSegement.toLowerCase()}
        />
        {Views[state.activeSegement]}
      </div>
    </div>
  );
}
