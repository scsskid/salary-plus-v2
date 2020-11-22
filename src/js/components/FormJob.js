import * as React from 'react';
import { useHistory, useParams } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { Prompt } from 'react-router';
import Button from './Button';
import Dialog from './Dialog';
import FormElement from './FormElement';
import LogToScreen from './LogToScreen';
import FormButtonRow from './FormButtonRow';

export function FormJobCreate({ saveJob }) {
  const history = useHistory();
  const initialFormData = {
    name: '',
    rate: '',
    dayHours: '',
    weekHours: '',
    hoursUnpaid: '',
    monthlyIncome: '',
    trackOvertime: false,
    trackEarnings: false,
    overtimeIsPaid: true,
    color: '#FF0000'
  };

  return (
    <FormJob
      initialFormData={initialFormData}
      saveJob={saveJob}
      history={history}
    />
  );
}

export function FormJobUpdate({ jobs, saveJob, deleteItem, settings }) {
  const { jobId } = useParams();
  const history = useHistory();
  const job = jobs.find((job) => job.id === parseInt(jobId));
  const initialFormData = {
    id: job.id,
    name: job.name,
    rate: parseFloat(job.rate) || '',
    dayHours: parseFloat(job.dayHours) || '',
    weekHours: parseFloat(job.weekHours) || '',
    hoursUnpaid: parseFloat(job.hoursUnpaid) || '',
    trackOvertime: job.trackOvertime || false,
    trackEarnings: job.trackEarnings || false,
    overtimeIsPaid: job.overtimeIsPaid || true,
    monthlyIncome: job.monthlyIncome || '',
    color: job.color || '#000'
  };

  return (
    <>
      <FormJob
        job={job}
        deleteItem={deleteItem}
        history={history}
        isUpdateForm={true}
        initialFormData={initialFormData}
        saveJob={saveJob}
        settings={settings}
      />
    </>
  );
}

export default function FormJob({
  deleteItem,
  history,
  isUpdateForm,
  initialFormData,
  saveJob,
  settings
}) {
  const [formData, setFormData] = React.useState(initialFormData);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});
  const [submit, setSubmit] = React.useState();
  const formIsHalfTouched =
    Object.values(touched).length > 0 &&
    Object.values(touched).length != Object.values(formData).length;

  React.useEffect(() => {
    if (submit) {
      handleDispatch(formData);
    }
  }, [submit]);

  function handleDispatch(formData) {
    saveJob(formData);
    history.push('/jobs');
  }

  function handleDelete() {
    deleteItem({ type: 'job', id: formData.id });
    history.push('/settings');
  }

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
      setSubmit(true);
    }
  }

  function handleChange(e) {
    const { name, value: tempValue, checked, type } = e.target;
    let value;

    switch (type) {
      case 'checkbox':
        value = checked;
        break;
      case 'number':
        value = +tempValue;
        break;
      default:
        value = tempValue;
        break;
    }

    setFormData({
      ...formData,
      [name]: value
    });

    setTouched({
      ...touched,
      [name]: true
    });
  }

  function handleBlur(e) {
    handleValidation(e.target);
  }

  // validation fns

  const validate = {
    name: validateNotEmpty,
    rate: validateNumber,
    dayHours: validateNumber,
    weekHours: validateNumber,
    hoursUnpaid: validateNumber,
    color: validateNotEmpty
  };

  function validateNotEmpty(value) {
    if (value.trim() === '') {
      return 'Field is required (is empty)';
    }
    return null;
  }

  function validateNumber(value) {
    if (!value) {
      return null;
    }
    const valueToString = '' + value;
    // const numberRegex = /^[+]?([0-9]*[.])?[0-9]{0,2}$/; //matches floats with up to 2 decimals
    const numberRegex = /^[+]?([0-9]*[.])?[0-9]+$/; //matches floats with any amount of decimals

    if (!valueToString.match(numberRegex)) {
      return 'Not a Valid Positive Number';
    }

    return null;
  }

  function handleValidation({ name, value }) {
    // spread existing errors: possibly existing error of current field, and ...rest (remove existing error)
    // eslint-disable-next-line no-unused-vars
    const { [name]: removedErrorWhatever, ...restErrors } = errors;

    const error = validate[name](value);

    setErrors({
      ...restErrors,
      ...(error && { [name]: touched[name] && error })
    });
  }

  return (
    <>
      <Prompt message="really navigate away?" when={formIsHalfTouched} />
      <LogToScreen title="touched" object={touched} settings={settings} />
      <LogToScreen title="errors" object={errors} settings={settings} />
      <form className="form-job" onSubmit={handleSubmit} autoComplete="off">
        <FormButtonRow>
          <Button actionType="cancel">Cancel</Button>
          <Button type="submit" data-button-submit="">
            Save
          </Button>
        </FormButtonRow>
        <fieldset>
          <FormElement
            htmlFor="name"
            label="Job Name"
            error={errors.name}
            touched={touched.name}
          >
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter a job name..."
            />
          </FormElement>
        </fieldset>
        <fieldset>
          <legend>Overtime</legend>
          <FormElement label="Track overtime" htmlFor="trackOvertime">
            <input
              type="checkbox"
              checked={formData.trackOvertime}
              name="trackOvertime"
              id="trackOvertime"
              value={formData.trackOvertime}
              onChange={handleChange}
              // handleBlur={handleBlur}
            />
          </FormElement>

          <FormElement
            htmlFor="dayHours"
            label="Regular Hours per Day"
            touched={touched.dayHours}
            errors={errors.dayHours}
          >
            <input
              id="dayHours"
              name="dayHours"
              type="number"
              step="0.01"
              min="0"
              value={formData.dayHours}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="0"
            />
          </FormElement>

          <FormElement
            htmlFor="weekHours"
            label="Regular Hours per Week"
            touched={touched.weekyHours}
            errors={errors.weekHours}
          >
            <input
              id="weekHours"
              name="weekHours"
              type="number"
              step="0.01"
              min="0"
              value={formData.weekHours}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="0"
            />
          </FormElement>

          <FormElement
            htmlFor="hoursUnpaid"
            label="Default Unpaid Hours per Day"
            touched={touched.hoursUnpaid}
            errors={errors.hoursUnpaid}
          >
            <input
              id="hoursUnpaid"
              name="hoursUnpaid"
              type="number"
              step="0.01"
              min="0"
              value={formData.hoursUnpaid}
              onChange={handleChange}
              placeholder="0"
            />
          </FormElement>
        </fieldset>
        <fieldset>
          <legend>Earnings Calculation</legend>
          <FormElement label="Track Earnings" htmlFor="trackEarnings">
            <input
              type="checkbox"
              checked={formData.trackEarnings}
              name="trackEarnings"
              id="trackEarnings"
              value={formData.trackEarnings}
              onChange={handleChange}
              // handleBlur={handleBlur}
            />
          </FormElement>
          <FormElement
            htmlFor="rate"
            label="Job Rate"
            touched={touched.rate}
            errors={errors.rate}
          >
            <input
              id="rate"
              type="number"
              step="0.01"
              name="rate"
              value={formData.rate}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="0"
            />
          </FormElement>
          <FormElement
            htmlFor="monthlyIncome"
            label="Income per month"
            touched={touched.monthlyIncome}
            errors={errors.monthlyIncome}
          >
            <input
              id="monthlyIncome"
              type="number"
              step="0.01"
              name="monthlyIncome"
              value={formData.monthlyIncome}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="0"
            />
          </FormElement>
          <FormElement label="Overtime is paid" htmlFor="overtimeIsPaid">
            <input
              type="checkbox"
              checked={formData.overtimeIsPaid}
              name="overtimeIsPaid"
              id="overtimeIsPaid"
              value={formData.overtimeIsPaid}
              onChange={handleChange}
              // handleBlur={handleBlur}
            />
          </FormElement>
        </fieldset>
        <fieldset>
          <FormElement
            htmlFor="color"
            label="Color 🎨"
            touched={touched.color}
            errors={errors.color}
          >
            <input
              style={{ padding: 0 }}
              id="color"
              name="color"
              type="color"
              value={formData.color}
              onChange={handleChange}
            />
          </FormElement>
        </fieldset>
        {isUpdateForm && (
          <p>
            <small>
              Updates to Job Settings will only not affect existing records for
              this Job (except color).
            </small>
          </p>
        )}

        <div>
          {isUpdateForm && (
            <Button
              type="button"
              onClick={() => {
                setDialogOpen(true);
              }}
              className="btn--delete"
              data-button-delete=""
            >
              Delete Job
            </Button>
          )}
        </div>
      </form>
      <LogToScreen title="formData" object={formData} settings={settings} />

      <Dialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        buttonConfirmLabel="Delete Job 🗑"
        handleConfirm={handleDelete}
      >
        <h1>Confirm deletion</h1>
        <p>
          Are you sure to permanently delete <b>{formData.name}</b>?
        </p>
        <p>
          <small>
            You will loose the ability to filter reporting by Job, entries wont
            be deleted.
          </small>
        </p>
      </Dialog>
    </>
  );
}
