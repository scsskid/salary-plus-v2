import React from 'react';
import Button from './Button';
import FormElement from './FormElement';
import FormElementSet from './FormElementSet';
import DatesPickerCalendar from './DatesPickerCalendar';
import { Prompt } from 'react-router';
import { useHistory } from 'react-router-dom';
import Dialog from './Dialog';

export default function FormRecord({
  saveRecord,
  deleteItem,
  linkedJob,
  jobs,
  isUpdateForm,
  settings,
  inputDate,
  changeMonth,
  initialFormData,
  dispatch
}) {
  const history = useHistory();
  const [formData, setFormData] = React.useState(initialFormData);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});
  const [datePickerOpen, setDatePickerOpen] = React.useState(false);
  const form = React.useRef();
  const [dates, setDates] = React.useState(initialFormData.dates);
  const [datePickerDisplayValue, setDatePickerDisplayValue] = React.useState(
    ''
  );
  const [submit, setSubmit] = React.useState();
  const jobWasDeleted = isUpdateForm && !linkedJob;
  const hasJobs = jobs.length > 0;
  const showJobsDropdown = (hasJobs && linkedJob) || (hasJobs && !isUpdateForm);
  const showJobsNameInput = jobs.length == 0 || jobWasDeleted;
  const showJobPropsFields = settings.allowCustomJobProps || jobWasDeleted;
  const formIsHalfTouched =
    Object.values(touched).length > 0 &&
    Object.values(touched).length != Object.values(formData).length;

  // Include dates directly in formData?
  React.useEffect(() => {
    setFormData({
      ...formData,
      dates
    });

    if (dates.length === 0) {
      setDatePickerDisplayValue('please select a date');
    } else if (dates.length === 1) {
      setDatePickerDisplayValue(dates[0]?.toLocaleDateString());
    } else if (dates.length > 0) {
      setDatePickerDisplayValue(`${dates.length} Dates`);
    }
  }, [dates]);

  React.useEffect(() => {
    if (submit) {
      handleDispatch(formData);
    }
  }, [submit]);

  // Change Handlers

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

    // Save as Previous FromData
    if (!isUpdateForm) {
      // validate before?
      dispatch({
        type: 'setPreviousFormDataProp',
        payload: { [e.target.name]: e.target.value }
      });
    }
  }

  function handleSelectJobChange(e) {
    const { name, value } = e.target;
    const selectedJobId = parseInt(value);
    const job = jobs.find((job) => job.id === selectedJobId);

    setFormData({
      ...formData,
      [name]: value, // jobId
      ['rate']: job?.rate,
      ['jobName']: job?.name,
      ['dayHours']: job?.dayHours,
      ['hoursUnpaid']: job?.hoursUnpaid
    });

    handleValidation({ name: 'jobId', value: value });
    handleValidation({ name: 'jobName', value: job?.name });
    handleValidation({ name: 'rate', value: job?.rate });
    handleValidation({ name: 'hoursUnpaid', value: job?.hoursUnpaid });
    handleValidation({ name: 'dayHours', value: job?.dayHours });

    setTouched({
      ...touched,
      jobId: true,
      jobName: true,
      rate: true,
      dayHours: true,
      hoursUnpaid: true
    });

    if (!isUpdateForm) {
      dispatch({
        type: 'setPreviousFormDataProp',
        payload: { jobId: selectedJobId, jobName: job?.name, rate: job?.rate }
      });
    }
  }

  function handleBlur(e) {
    handleValidation(e.target);
  }

  function handleDatesChange(newDates) {
    setDates(newDates);
    handleValidation({ name: 'dates', value: newDates });
    setTouched({ ...touched, dates: true });
  }

  // Validation Functions

  const validate = {
    jobId: validateJobId,
    jobName: validateJobName,
    dates: validateDates,
    timeBegin: validateTime,
    timeEnd: validateTime,
    hoursUnpaid: validateNumber,
    dayHours: validateNumber,
    rate: validateNumber,
    bonus: validateNumber
  };

  function handleValidation({ name, value }) {
    // spread existing errors: possibly existing error of current field, and ...rest (remove existing error)
    // eslint-disable-next-line no-unused-vars
    const { [name]: removedErrorWhatever, ...restErrors } = errors;

    const error = validate[name](name, value);

    setErrors({
      ...restErrors,
      ...(error && { [name]: touched[name] && error })
    });
  }

  function validateJobId(name, value) {
    if (parseInt(value) === 0 && formData.jobName === '') {
      return 'Select a Job or Provide a Custom JobName';
    }
    return null;
  }

  function validateJobName(name, value) {
    if (value.trim() === '') {
      return 'jobName is required (is empty)';
    }
    return null;
  }

  function validateDates(name, value) {
    if (!value?.length) {
      return 'no dates selected';
    }

    return null;
  }

  function validateTime(name, value) {
    const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;

    if (!value.match(timeRegex)) {
      return `${value} not in HH:mm format`;
    }

    return null;
  }

  function validateNumber(name, value) {
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

  // handle Submission

  function handleSubmit(e) {
    e.preventDefault();
    const formDataKeys = Object.keys(formData);
    const formValidation = formDataKeys.reduce(
      (acc, key) => {
        const hasValidationFunction = typeof validate[key] === 'function';
        const newError = hasValidationFunction // validation whole form
          ? validate[key](null, formData[key])
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

  function handleDispatch(formData) {
    formData.dates.forEach((date) => {
      const singleDateFormData = {
        ...formData,
        dateBegin: date
      };
      saveRecord(singleDateFormData);
    });
    history.push('/');
  }

  function handleDelete() {
    deleteItem({ type: 'record', id: formData.id });
    history.push('/');
  }

  return (
    <>
      <Prompt message="really navigate away?" when={formIsHalfTouched} />
      {/* <pre>touched</pre>
      <pre style={{ fontSize: '12px' }}>{JSON.stringify(touched, null, 2)}</pre>
      <pre>errors</pre>
      <pre style={{ fontSize: '12px' }}>{JSON.stringify(errors, null, 2)}</pre> */}
      <form
        className="form-record"
        ref={form}
        onSubmit={handleSubmit}
        data-record-id={formData.recordId}
        autoComplete="off"
      >
        <input type="hidden" name="id" value={formData.id} />

        <fieldset>
          <FormElementSet>
            {showJobsDropdown && (
              <FormElement
                label="Select Job (id)"
                error={errors.jobId}
                htmlFor="entry-job"
              >
                <select
                  name="jobId"
                  id="entry-job"
                  value={formData.jobId}
                  onBlur={handleBlur}
                  onChange={handleSelectJobChange}
                >
                  <option key={`job-0`} disabled={true} value={0}>
                    None
                  </option>
                  {jobs.map((job) => (
                    <option key={`job-${job.id}`} value={job.id}>
                      {job.name}
                    </option>
                  ))}
                </select>
              </FormElement>
            )}
            {showJobsNameInput && (
              <FormElement
                htmlFor="jobName"
                error={errors.jobName}
                touched={touched.jobName}
                label="Job Name"
              >
                <input
                  name="jobName"
                  id="jobName"
                  value={formData.jobName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </FormElement>
            )}
          </FormElementSet>
        </fieldset>
        {jobWasDeleted && (
          <p>
            <small>
              This record was attached to a job which was since deleted. You can
              still edit contents and provide a diffrent Jobname.
            </small>
          </p>
        )}

        <fieldset>
          <FormElement label="Select Dates...">
            <input
              name="dates"
              id="dates"
              value={datePickerDisplayValue}
              variant="dates field value"
              readOnly={true}
              onClick={() => setDatePickerOpen(!datePickerOpen)}
            />
          </FormElement>

          <DatesPickerCalendar
            inputDate={inputDate}
            settings={settings}
            isUpdateForm={isUpdateForm}
            changeMonth={changeMonth}
            datePickerOpen={datePickerOpen}
            dates={dates}
            updateDates={handleDatesChange}
          />

          <FormElementSet>
            <FormElement
              error={errors.timeBegin}
              touched={touched.timeBegin}
              htmlFor="timeBegin"
              label="Starts"
            >
              <input
                name="timeBegin"
                id="timeBegin"
                type="time"
                value={formData.timeBegin}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormElement>

            <FormElement
              error={errors.timeEnd}
              touched={touched.timeEnd}
              htmlFor="timeEnd"
              label="Ends"
            >
              <input
                name="timeEnd"
                id="timeEnd"
                type="time"
                value={formData.timeEnd}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormElement>
          </FormElementSet>
        </fieldset>

        {showJobPropsFields && (
          <fieldset>
            <FormElement
              label="dayHours"
              error={errors.dayHours}
              touched={touched.dayHours}
              htmlFor="dayHours"
            >
              <input
                name="dayHours"
                id="dayHours"
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
              label="Hours unpaid"
              error={errors.hoursUnpaid}
              touched={touched.hoursUnpaid}
              htmlFor="hoursUnpaid"
            >
              <input
                name="hoursUnpaid"
                id="hoursUnpaid"
                type="number"
                step="0.01"
                min="0"
                value={formData.hoursUnpaid}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="0"
              />
            </FormElement>

            <FormElement
              label="Rate"
              error={errors.rate}
              touched={touched.rate}
              htmlFor="rate"
            >
              <input
                inputMode="decimal"
                variant="currency"
                name="rate"
                id="rate"
                type="number"
                step="0.01"
                min="0"
                value={formData.rate}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="0"
              />
            </FormElement>
          </fieldset>
        )}
        <fieldset>
          <FormElement
            label="Bonus"
            error={errors.bonus}
            touched={touched.bonus}
            htmlFor="bonus"
          >
            <input
              inputMode="decimal"
              variant="currency"
              name="bonus"
              id="bonus"
              type="number"
              step="0.01"
              min="0"
              value={formData.bonus}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="0"
            />
          </FormElement>
        </fieldset>
        {settings.sickleaveOnNewRecordForm && (
          <fieldset>
            <FormElementSet>
              <FormElement label="Sick Leave?" htmlFor="sickLeave">
                <input
                  type="checkbox"
                  checked={formData.sickLeave}
                  name="sickLeave"
                  id="sickLeave"
                  value={formData.sickLeave}
                  onChange={handleChange}
                  // handleBlur={handleBlur}
                />
              </FormElement>
            </FormElementSet>
          </fieldset>
        )}
        {/* <pre>🤚 formIsHalfTouched {String(formIsHalfTouched)}</pre> */}
        <Button type="submit" data-button-submit="">
          Save
        </Button>
        {Object.values(errors).length !== 0 && <p>There were ERRORS</p>}
        {isUpdateForm && (
          <Button
            type="button"
            onClick={() => {
              setDialogOpen(true);
            }}
            className="btn--delete"
            data-button-delete=""
          >
            Delete Record
          </Button>
        )}
      </form>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
      <pre>{JSON.stringify(settings, null, 2)}</pre>

      <Dialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        buttonConfirmLabel="Delete Job 🗑"
        handleConfirm={handleDelete}
      >
        <h1>Confirm deletion</h1>
        <p>Are you sure to permanently delete this record?</p>
      </Dialog>
    </>
  );
}
