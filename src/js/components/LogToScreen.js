import * as React from 'react';

export default function LogToScreen({ object = {}, settings = {} }) {
  return settings.showDebugInfo ? (
    <pre style={{ fontSize: '.6rem' }}>{JSON.stringify(object, null, 2)}</pre>
  ) : null;
}
