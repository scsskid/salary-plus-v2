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
      <button className="btn" onClick={decreaseInputDate}>
        Prev
      </button>
      {` `}
      <button className="btn" onClick={resetInputDate}>
        Today
      </button>
      {` `}
      <button className="btn" onClick={increaseInputDate}>
        Next
      </button>
    </p>
  );
}

export default CalendarControls;
