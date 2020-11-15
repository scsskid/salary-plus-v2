import React from 'react';
import { useRouteMatch, useLocation } from 'react-router-dom';

export default function SegmentNav({ pages = [1, 2, 3] }) {
  const { url, path } = useRouteMatch;
  const { pathname } = useLocation();

  const page = pages.find((page) => {
    return page.segments.find((segment) => segment.url === pathname);
  });

  console.log(url, path, pathname, page);
  return (
    <div className="segment-nav">
      {pages.map((segment, i) => (
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
