import * as React from 'react';
import RecordsList from './RecordsList';
import { getRecordsByMonth } from '../utils/dataHelpers.js';
import * as r from '../utils/reporting-fns';
import FigureHours from './FigureHours';
import FigureEarned from './FigureEarned';

export default function Reporting({ inputDate, records, jobs, settings }) {
  //
  const monthRecords = getRecordsByMonth({
    records,
    date: inputDate
  });

  // const { inputJobId } = settings;

  const workedHoursWithoutOvertime = r.getWorkedHoursWithoutOvertime(
    monthRecords
  );
  const workedHoursWithoutOvertimeEarned = r.getWorkedHoursWithoutOvertimeEarned(
    monthRecords
  );

  const overtimeHours = r.getOvertimeHours(monthRecords);
  const overtimeEarned = r.getOvertimeEarned(monthRecords) || 0;

  const workedHours = r.getWorkedHours(monthRecords);
  const workedHoursEarned = r.getWorkedHoursEarned(monthRecords) || 0;

  const bonusEarned = r.getBonusEarned(monthRecords);
  const totalsEarned = r.getTotalsEarned(monthRecords) || 0;

  const Views = {
    Month: (
      <div className="reporting-month | reporting-component">
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
                    value={workedHoursWithoutOvertime}
                    settings={settings}
                  />
                </td>
                <td>
                  <b>
                    <FigureEarned
                      value={workedHoursWithoutOvertimeEarned}
                      settings={settings}
                    />
                  </b>
                </td>
              </tr>
              <tr className="table-reporting-row">
                <th>Overtime</th>
                <td>
                  <FigureHours value={overtimeHours} settings={settings} />
                </td>
                <td>
                  <b>
                    <FigureEarned value={overtimeEarned} settings={settings} />{' '}
                  </b>
                </td>
              </tr>
            </tbody>
          </table>
          {isNaN(r.getOvertimeEarned(monthRecords)) && (
            <p style={{ color: 'red' }}>
              Error: Could not Calculate overtime Earned, due to to records
              present set to pamentType monthly, but weekHours, daysPerWeek or
              monthlyIncome not set.
            </p>
          )}
          <p className="totals">
            Claimable Salary (
            <FigureHours value={workedHours} settings={settings} />)
            <b>
              <FigureEarned value={workedHoursEarned} settings={settings} />
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
                    <FigureEarned value={bonusEarned} settings={settings} />
                  </b>
                </td>
              </tr>
            </tbody>
          </table>
          <p className="totals">
            Total{' '}
            <b>
              <FigureEarned value={totalsEarned} settings={settings} />
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
