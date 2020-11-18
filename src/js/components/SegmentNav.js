import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

export default function SegmentNav({ segments = [] }) {
  const history = useHistory();
  const { pathname } = useLocation();

  return (
    <div className="segment-nav">
      {segments.map((segment, i) => (
        <SegmentNavEl
          id={segment}
          key={i}
          isActive={segment.path === pathname ? true : false}
          onClick={() => {
            history.push(segment.path);
          }}
        >
          <b>{segment.title}</b>
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
