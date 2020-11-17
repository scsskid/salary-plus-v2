import React from 'react';
import FigureHours from './FigureHours';
import FigureEarned from './FigureEarned';
import { getRecordsByMonth } from '../utils/dataHelpers.js';

export default function Reporting({ inputDate, records }) {
  const monthRecords = getRecordsByMonth({
    records,
    date: inputDate
  });

  const Views = {
    Month: (
      <div className="reporting-month | reporting-component">
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
                  <FigureHours records={monthRecords} type="contract" />
                </td>
                <td>
                  <b>
                    <FigureEarned records={monthRecords} type="contract" />
                  </b>
                </td>
              </tr>
              <tr className="table-reporting-row">
                <th>Overtime</th>
                <td>
                  <FigureHours records={monthRecords} type="overtime" />
                </td>
                <td>
                  <b>
                    <FigureEarned records={monthRecords} type="overtime" />
                  </b>
                </td>
              </tr>
            </tbody>
          </table>
          <p className="totals">
            Claimable Salary (
            <FigureHours records={monthRecords} type="actual" /> hours)
            <b>
              <FigureEarned records={monthRecords} type="actual" />
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
                    <FigureEarned records={monthRecords} type="bonus" />
                  </b>
                </td>
              </tr>
            </tbody>
          </table>
          <p className="totals">
            Total{' '}
            <b>
              <FigureEarned records={monthRecords} type="totals" />
            </b>
          </p>
        </div>
      </div>
    )
  };

  return (
    <div className="reporting main-component">
      <div className="app-body">{Views['Month']}</div>
    </div>
  );
}
