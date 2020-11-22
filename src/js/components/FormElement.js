import * as React from 'react';

export default function FormElement({
  htmlFor,
  touched,
  error,
  children,
  disabled,
  label = 'Unnamed Form Element'
}) {
  const inputError = touched && error;
  const defaultClassName = 'form-el';
  const className = inputError
    ? `${defaultClassName} form-el--hasError`
    : defaultClassName;

  return (
    <div className={className}>
      <label htmlFor={htmlFor}>
        <p style={{ opacity: disabled ? 0.5 : 1 }}>
          {label}
          {/* {variant ? `(${variant})` : ''} */}
        </p>
        {children}
      </label>
      {touched && error && <div className="form-el-error">{error}</div>}
    </div>
  );
}
