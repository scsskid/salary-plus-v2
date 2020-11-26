import * as React from 'react';

export function WidgetInputJobId({
  handleInputJobIdChange,
  jobs,
  settings,
  unattachedRecordsCount
}) {
  const jobOptions = jobs.map((job) => (
    <option key={`job-${job.id}`} value={job.id}>
      {job.jobName}
    </option>
  ));

  return jobs.length > 1 ||
    (unattachedRecordsCount > 0 && jobs.length === 1) ? (
    <select
      name="inputJobId"
      id="inputJobId"
      value={settings.inputJobId}
      onBlur={() => {}}
      onChange={handleInputJobIdChange}
    >
      <option key={`job-0`} value={0}>
        All Jobs
      </option>
      {jobOptions}
    </select>
  ) : jobs.length === 1 ? (
    jobs.map((job) => job.jobName)
  ) : (
    'no saved job'
  );
}
