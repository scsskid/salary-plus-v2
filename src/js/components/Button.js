import React from 'react';

export default function Button({ className, ...props }) {
  const defaultProps = {
    className: `btn ${className}`,
    children: `Unlabelled Button`
  };

  return <button {...defaultProps} {...props}></button>;
}
