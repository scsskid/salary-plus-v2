import * as React from 'react';

function FormElement({
  name,
  id,
  type,
  value,
  step,
  inputMode,
  onChange,
  variant,
  children,
  checked,
  disabled
}) {
  return (
    <div className="form-el">
      <label htmlFor={id}>
        <p>
          {children} {variant ? `(${variant})` : ''}
        </p>
        <input
          name={name}
          id={id}
          type={type}
          step={step}
          value={value}
          inputMode={inputMode}
          onChange={onChange}
          checked={checked}
          disabled={disabled}
        />
      </label>
    </div>
  );
}

export default FormElement;
