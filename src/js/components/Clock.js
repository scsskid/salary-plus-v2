import * as React from 'react';
import useClock from '../hooks/useClock';

export default function Clock() {
  const clock = useClock();

  return (
    <>
      {' '}
      {clock.now.toLocaleTimeString()}
      <br />
      {clock.today.toLocaleDateString()}{' '}
    </>
  );
}
