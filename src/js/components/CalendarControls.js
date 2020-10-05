import React from 'react';

function CalendarControls({ changeMonth }) {
  const decreaseInputDate = () => {
    changeMonth(-1);
  };

  const resetInputDate = () => {
    changeMonth(0);
  };

  const increaseInputDate = () => {
    changeMonth(1);
  };

  return (
    <p>
      <button onClick={decreaseInputDate}>Prev</button>
      <button onClick={resetInputDate}>Today</button>
      <button onClick={increaseInputDate}>Next</button>
    </p>
  );
}

export default CalendarControls;
