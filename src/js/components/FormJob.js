import * as React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { Prompt } from 'react-router';
import Button from './Button';
import Dialog from './Dialog';
import FormElement from './FormElement';
import LogToScreen from './LogToScreen';
import FormButtonRow from './FormButtonRow';

const defaultFormData = {
  jobName: '',
  rate: '',
  dayHours: '',
  weekHours: '',
  hoursUnpaid: '',
  monthlyIncome: '',
  daysPerWeek: 5,
  trackOvertime: false,
  trackEarnings: false,
  color: '#FF0000',
  paymentType: 'hourly',
  allowCustomJobPropsInRecordForm: false
};

export function FormJobCreate({ saveJob, settings }) {
  return (
    <FormJob
      initialFormData={defaultFormData}
      saveJob={saveJob}
      settings={settings}
    />
  );
}

export function FormJobUpdate({ jobs, saveJob, deleteItem, settings }) {
  const { jobId } = useParams();
  const initialFormData = {
    ...defaultFormData,
    ...jobs.find((job) => job.id === +jobId)
  };

  return (
    <>
      <FormJob
        job={initialFormData}
        deleteItem={deleteItem}
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
  isUpdateForm,
  initialFormData,
  saveJob,
  settings
}) {
  const history = useHistory();
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
    jobName: validateNotEmpty,
    rate: validateNumber,
    dayHours: validateNumber,
    weekHours: validateNumber,
    daysPerWeek: validateNumber,
    hoursUnpaid: validateNumber,
    monthlyIncome: validateNumber,
    color: validateNotEmpty,
    paymentType: validateNotEmpty
  };

  function validateNotEmpty(value) {
    if (('' + value).trim() === '') {
      return 'Field is required (is empty)';
    }
    return null;
  }

  function validateNumber(value) {
    if (!value) {
      return null;
    }
    const valueToString = '' + value;
    const numberRegex = /^[+]?([0-9]*[.])?[0-9]+$/;

    if (!valueToString.match(numberRegex)) {
      return 'Not a Valid Positive Number';
    }

    return null;
  }

  function handleValidation({ name, value }) {
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
      <Prompt message="Discard unsaved changes?" when={formIsHalfTouched} />
      <LogToScreen title="touched" object={touched} settings={settings} />
      <LogToScreen title="errors" object={errors} settings={settings} />
      <form className="form-job" onSubmit={handleSubmit} autoComplete="off">
        <FormButtonRow>
          {/* <Button actionType="cancel">Cancel</Button> */}
          <Link to="/jobs">Cancel</Link>
          <Button type="submit" data-button-submit="">
            Save
          </Button>
        </FormButtonRow>
        <fieldset>
          <FormElement
            htmlFor="name"
            label="Job Name"
            error={errors.jobName}
            touched={touched.jobName}
          >
            <input
              type="text"
              name="jobName"
              value={formData.jobName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter a job name..."
              required={true}
            />
          </FormElement>

          <FormElement
            label="Payment is hours based"
            htmlFor="paymentTypeHourly"
          >
            <input
              type="radio"
              checked={formData.paymentType === 'hourly'}
              name="paymentType"
              id="paymentTypeHourly"
              value="hourly"
              onChange={handleChange}
            />
          </FormElement>
          <FormElement
            label="Payment is month based"
            htmlFor="paymentTypeMonthly"
          >
            <input
              type="radio"
              checked={formData.paymentType === 'monthly'}
              name="paymentType"
              id="paymentTypeMonthly"
              value="monthly"
              onChange={handleChange}
            />
          </FormElement>
        </fieldset>

        {formData.paymentType === 'hourly' && (
          <>
            <fieldset>
              <FormElement
                htmlFor="dayHours"
                label="Hours per day"
                touched={touched.dayHours}
                errors={errors.dayHours}
                disabled={formData.paymentType === 'monthly'}
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
                  disabled={formData.paymentType === 'monthly'}
                />
              </FormElement>

              <FormElement
                htmlFor="rate"
                label="Hourly Rate"
                touched={touched.rate}
                errors={errors.rate}
                disabled={formData.paymentType === 'monthly'}
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
                  disabled={formData.paymentType === 'monthly'}
                />
              </FormElement>
            </fieldset>
          </>
        )}
        {formData.paymentType === 'monthly' && (
          <fieldset>
            <FormElement
              htmlFor="weekHours"
              label="Hours per week"
              touched={touched.weekHours}
              errors={errors.weekHours}
              disabled={formData.paymentType === 'hourly'}
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
                disabled={formData.paymentType === 'hourly'}
              />
            </FormElement>

            <FormElement
              htmlFor="daysPerWeek"
              label="Days per week"
              touched={touched.daysPerWeek}
              errors={errors.daysPerWeek}
              disabled={formData.paymentType === 'hourly'}
            >
              <input
                id="daysPerWeek"
                name="daysPerWeek"
                type="number"
                step="1"
                min="0"
                max="7"
                value={formData.daysPerWeek}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="0"
                disabled={formData.paymentType === 'hourly'}
              />
            </FormElement>

            <FormElement
              htmlFor="monthlyIncome"
              label="Fixed monthly income"
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
          </fieldset>
        )}

        <fieldset>
          <FormElement
            htmlFor="hoursUnpaid"
            label="Unpaid Hours per Day (Break)"
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
              required={true}
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
                if (
                  window.confirm(
                    `Are you sure Are you sure to permanently delete ${formData.jobName}? You will loose the ability to filter views by job, entries wont be deleted.`
                  )
                ) {
                  handleDelete();
                }
                // setDialogOpen(true);
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
          Are you sure to permanently delete <b>{formData.jobName}</b>?
        </p>
        <p>
          <small>
            You will loose the ability to filter reporting by job, entries wont
            be deleted.
          </small>
        </p>
      </Dialog>
    </>
  );
}
