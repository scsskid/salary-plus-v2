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
  const inputError = touched && error;
  const defaultClassName = 'form-el';
  const className = inputError
    ? `${defaultClassName} form-el--hasError`
    : defaultClassName;

  console.log(inputError, touched, error);

  return (
    <>
      <div className={className}>
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
        {touched && error && <div className="form-el-error">{error}</div>}
      </div>
    </>
  );
}

export default FormElement;
