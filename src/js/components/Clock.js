import * as React from 'react';
import { useClock } from '../utils/hooks';

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
