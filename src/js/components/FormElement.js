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
  children
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
          defaultValue={defaultValue}
          inputMode={inputMode}
          checked={checked}
          readOnly={readOnly}
          disabled={disabled}
          onChange={handleChange}
          onClick={handleClick}
          onBlur={handleBlur}
          placeholder={placeholder}
        />
      </label>
    </div>
  );
}

export default FormElement;
