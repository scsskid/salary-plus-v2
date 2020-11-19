import * as React from 'react';

export default function Button({ className, ...props }) {
  const defaultProps = {
    className: className ? `btn ${className}` : 'btn',
    type: 'button',
    children: `Unlabelled Button`
  };

  return <button {...defaultProps} {...props}></button>;
}
