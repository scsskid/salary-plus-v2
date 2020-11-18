/* eslint-disable */
import * as React from 'react';

export default function useForm() {
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});

  function handleSubmit(e) {
    e.preventDefault();
    const formDataKeys = Object.keys(formData);
    const formValidation = formDataKeys.reduce(
      (acc, key) => {
        const hasValidationFunction = typeof validate[key] === 'function';
        const newError = hasValidationFunction // validation whole form
          ? validate[key](formData[key])
          : null;
        const newTouched = { [key]: true };

        return {
          errors: {
            ...acc.errors,
            ...(newError && { [key]: newError })
          },
          touched: {
            ...acc.touched,
            ...newTouched
          }
        };
      },
      {
        errors: { ...errors },
        touched: { ...touched }
      }
    );

    setErrors(formValidation.errors);
    setTouched(formValidation.touched);

    if (
      !Object.values(formValidation.errors).length && // errors object is empty
      Object.values(formValidation.touched).length ===
        Object.values(formData).length && // all fields were touched
      Object.values(formValidation.touched).every((t) => t === true) // every touched field is true
    ) {
      // alert(JSON.stringify(formData, null, 2));
      setSubmit(true);
    }
  }
}
