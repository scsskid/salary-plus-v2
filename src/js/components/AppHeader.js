import * as React from 'react';
import { useLocation } from 'react-router-dom';

export default function AppHeader({ title = 'Untitled Page', children }) {
  const { pathname } = useLocation();

  switch (pathname) {
    case '/':
      title = 'Home';
      break;
    case '/calendar':
      title = 'Calendar';
      break;
    case '/reporting':
      title = 'Reporting';
      break;
    case '/list':
      title = 'All Records';
      break;
  }
  return (
    <div className="app-header">
      <h1>{title}</h1>

      {children}
    </div>
  );
}
