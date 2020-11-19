import * as React from 'react';

export default function Notification({
  notification,
  mountingState = 'unmounted'
}) {
  const defaultClassName = 'notification';
  const className = `${defaultClassName} ${defaultClassName}--${mountingState}`;

  return mountingState !== 'unmounted' ? (
    <div className={className}>{notification}</div>
  ) : null;
}
