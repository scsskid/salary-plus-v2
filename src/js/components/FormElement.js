import * as React from 'react';

function FormElement({
  name,
  id,
  type,
  value,
  defaultValue,
  step,
  inputMode,
  variant,
  checked,
  disabled,
  readOnly,
  handleClick,
  handleChange,
  handleBlur,
  placeholder,
  children,
  touched,
  error,
  min,
  max
}) {
  return (
    <>
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
            defaultValue={defaultValue}
            inputMode={inputMode}
            checked={checked}
            readOnly={readOnly}
            disabled={disabled}
            onChange={handleChange}
            onClick={handleClick}
            onBlur={handleBlur}
            placeholder={placeholder}
            min={min}
            max={max}
          />
        </label>
      </div>
      <p>
        <b>{touched && error}</b>
      </p>
    </>
  );
}

export default FormElement;
