import React from 'react';
import InputDateControl from './InputDateControl';
import SegmentNav, { SegmentNavEl } from './SegmentNav';
import InputDateDisplay from './InputDateDisplay';
import FigureHoursElapsed from './FigureHoursElapsed';
import FigureEarned from './FigureEarned';
import FigureBonus from './FigureBonus';

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
        <div>Records: {monthRecords.length}</div>

        <div className="table-reporting-container">
          <table className="table-reporting-helper-head">
            <colgroup>
              <col className="col-heading" />
              <col className="col-hours" />
              <col className="col-earned" />
            </colgroup>
            <thead>
              <tr>
                <td></td>
                <th>H</th>
                <th>€</th>
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
                  <FigureHoursElapsed records={monthRecords} />
                </td>
                <td>
                  <FigureEarned records={monthRecords} />
                </td>
              </tr>
              <tr className="table-reporting-row">
                <th>Overtime</th>
                <td>
                  <FigureHoursElapsed records={[]} />
                </td>
                <td>
                  <FigureEarned records={[]} />
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            Total Salary <b>X €</b>
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
                  <FigureBonus records={monthRecords} />
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            Total Salary <b>X €</b>
          </p>
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
