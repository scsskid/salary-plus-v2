import React from 'react';

export default function InputDateDisplay({ inputDate, settings }) {
  return (
    <div className="input-date-display">
      {inputDate.toLocaleDateString(undefined, {
        month: 'long',
        timeZone: settings.timeZone
      })}{' '}
      {inputDate.getFullYear()}
    </div>
  );
}
