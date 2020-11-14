import React from 'react';

export default function SegmentNav({ segments = [1, 2, 3] }) {
  return (
    <div className="segment-nav">
      {segments.map((segment, i) => (
        <SegmentNavEl
          id={segment}
          key={i}
          // isActive={state.activeSegement === segment ? true : false}
          isActive={false}
          onClick={(event) => {}}
        >
          <b>{i}</b>
        </SegmentNavEl>
      ))}
    </div>
  );
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
      {children}
    </button>
  );
}
