import * as React from 'react';

export function WidgetInputJobId({ handleInputJobIdChange, jobs, settings }) {
  return jobs.length > 1 ? (
    <select
      name="inputJobId"
      id="inputJobId"
      value={settings.inputJobId}
      onBlur={handleInputJobIdChange}
      onChange={handleInputJobIdChange}
    >
      <option key={`job-0`} value={0}>
        All Jobs
      </option>
      {jobs.map((job) => (
        <option key={`job-${job.id}`} value={job.id}>
          {job.name}
        </option>
      ))}
    </select>
  ) : jobs.length === 1 ? (
    jobs.map((job) => job.name)
  ) : (
    'no job'
  );
}
