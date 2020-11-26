import * as React from 'react';
import RecordsList from './RecordsList';
import { getRecordsByMonth } from '../utils/dataHelpers.js';
import { Link } from 'react-router-dom';
import * as r from '../utils/reporting-fns';
import FigureHours from './FigureHours';
import FigureEarned from './FigureEarned';

export default function Reporting({ inputDate, records, jobs, settings }) {
  const source = 'record';
  //
  const monthRecords = getRecordsByMonth({
    records,
    date: inputDate
  });

  const { inputJobId } = settings;

  const workedHours = r.getWorkedHours(
    records,
    source === 'jobs' ? jobs : undefined
  );

  const overtimeHours = r.getOvertimeHours(
    records,
    source === 'jobs' ? jobs : undefined
  );

  const workedHoursEarned = r.getWorkedHoursEarned(records);

  React.useEffect(() => {
    // console.log(jobs, inputJobData, trackOvertime);
    console.log(workedHours);
    console.log(overtimeHours);
    console.log(workedHoursEarned);
  }, [inputJobId]);

  const Views = {
    Month: (
      <div className="reporting-month | reporting-component">
        <p>
          <Link to="/view/calendar">View Calendar</Link>
        </p>
        <div>Records: {monthRecords.length}</div>

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
                  <FigureHours
                    value={r.getWorkedHoursWithoutOvertime(monthRecords)}
                    settings={settings}
                  />
                </td>
                <td>
                  <b>
                    <FigureEarned
                      value={r.getWorkedHoursWithoutOvertimeEarned(
                        monthRecords
                      )}
                      settings={settings}
                    />
                  </b>
                </td>
              </tr>
              <tr className="table-reporting-row">
                <th>Overtime</th>
                <td>
                  <FigureHours
                    value={r.getOvertimeHours(monthRecords)}
                    settings={settings}
                  />
                </td>
                <td>
                  <b>
                    <FigureEarned
                      value={r.getOvertimeEarned(monthRecords)}
                      settings={settings}
                    />{' '}
                  </b>
                </td>
              </tr>
            </tbody>
          </table>
          <p className="totals">
            Claimable Salary (
            <FigureHours
              value={r.getWorkedHours(monthRecords)}
              settings={settings}
            />
            )
            <b>
              <FigureEarned
                value={r.getWorkedHoursEarned(monthRecords)}
                settings={settings}
              />
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
                    <FigureEarned
                      value={r.getBonusEarned(monthRecords)}
                      settings={settings}
                    />
                  </b>
                </td>
              </tr>
            </tbody>
          </table>
          <p className="totals">
            Total{' '}
            <b>
              <FigureEarned
                value={r.getTotalsEarned(monthRecords)}
                settings={settings}
              />
            </b>
          </p>
        </div>
      </div>
    )
  };

  return (
    <div className="reporting main-component">
      <div className="app-body">{Views['Month']}</div>
      <RecordsList records={monthRecords} settings={settings} jobs={jobs} />
    </div>
  );
}
