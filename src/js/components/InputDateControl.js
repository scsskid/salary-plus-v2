import * as React from 'react';
import Button from './Button';

export default function InputDateControl({ changeMonth }) {
  return (
    <div className="input-date-control">
      <Button onClick={() => changeMonth(-1)}>Prev</Button>{' '}
      <Button onClick={() => changeMonth(0)}>Today</Button>{' '}
      <Button onClick={() => changeMonth(1)}>Next</Button>
    </div>
  );
}
