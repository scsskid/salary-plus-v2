import * as React from 'react';

export default function LogToScreen({
  title = '',
  object = {},
  settings = {}
}) {
  return settings.showDebugInfo ? (
    <>
      {title && <pre style={{ fontSize: '.6rem' }}>{title}</pre>}
      <pre style={{ fontSize: '.6rem' }}>{JSON.stringify(object, null, 2)}</pre>
    </>
  ) : null;
}
