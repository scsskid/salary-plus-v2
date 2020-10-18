import React from 'react';

export default function Button({ className, onClick, children, ...props }) {
  const defaultClassName = 'btn';

  return (
    <button
      onClick={
        onClick
          ? onClick
          : () => {
              return false;
            }
      }
      className={
        className ? `${defaultClassName} ${className}` : defaultClassName
      }
      {...props}
    >
      {children}
    </button>
  );
}
