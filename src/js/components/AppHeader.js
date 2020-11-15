import * as React from 'react';

export default function AppHeader({ title = 'Untitled Page', children }) {
  return (
    <div className="app-header">
      <h1>{title}</h1>
      {children}
    </div>
  );
}
