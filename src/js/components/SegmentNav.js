import React from 'react';

export default function SegmentNav({ children }) {
  return <div className="segment-nav">{children}</div>;
}

export function SegmentNavEl({ id, isActive, onClick, children }) {
  const defaultClassName = 'segment-nav-el';

  return (
    <button
      id={id}
      className={
        isActive
          ? `${defaultClassName} ${defaultClassName}--active`
          : defaultClassName
      }
      onClick={onClick}
    >
      <b>{children}</b>
    </button>
  );
}
