import * as React from 'react';

export function WidgetInputJob({ handleInputJobChange, jobs, settings }) {
  return jobs.length > 1 ? (
    <select
      name="inputJob"
      id="inputJob"
      value={settings.inputJob}
      onBlur={handleInputJobChange}
      onChange={handleInputJobChange}
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
