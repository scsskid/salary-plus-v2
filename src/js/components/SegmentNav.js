import React from 'react';
import { useRouteMatch, useLocation, useHistory } from 'react-router-dom';

export default function SegmentNav({ pages = [1, 2, 3] }) {
  const { url, path } = useRouteMatch;
  const history = useHistory();
  const { pathname } = useLocation();
  const { segments } = pages.find((page) => {
    return page.segments.find((segment) => segment.url === pathname);
  });

  console.log(url, path, pathname, segments);
  return (
    <div className="segment-nav">
      {segments.map((segment, i) => (
        <SegmentNavEl
          id={segment}
          key={i}
          isActive={segment.url === pathname ? true : false}
          onClick={() => {
            history.push(segment.url);
          }}
        >
          <b>{segment.name}</b>
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
