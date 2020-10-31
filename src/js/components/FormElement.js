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
  disabled,
  readOnly,
  onClick,
  placeholder
}) {
  return (
    <div className="form-el">
      <label htmlFor={id}>
        <p>
          {children}
          {/* {variant ? `(${variant})` : ''} */}
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
          readOnly={readOnly}
          disabled={disabled}
          onClick={onClick}
          placeholder={placeholder}
        />
      </label>
    </div>
  );
}

export default FormElement;
