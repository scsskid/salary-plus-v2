import React from 'react';

export default function Button({ className, children, ...props }) {
  const defaultClassName = 'btn';

  return (
    <button
      className={
        className ? `${defaultClassName} ${className}` : defaultClassName
      }
      {...props}
    >
      {children}
    </button>
  );
}
