import * as React from 'react';
import Button from './Button';
import FormElement from './FormElement';
import DatesPickerCalendar from './DatesPickerCalendar';
import { Prompt } from 'react-router';
import { useHistory } from 'react-router-dom';
import Dialog from './Dialog';
import LogToScreen from './LogToScreen';
import FormButtonRow from './FormButtonRow';
import ScrollToTopOnMount from './ScrollToTopOnMount';

export default function FormRecord({
  saveRecord,
  deleteItem,
  linkedJob: linkedJobParent,
  jobs,
  isUpdateForm,
  settings,
  inputDate,
  clock,
  changeMonth,
  initialFormData,
  dispatch,
  records
}) {
  const history = useHistory();
  const [formData, setFormData] = React.useState(initialFormData);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [showJobPropsFieldsLocal, setShowJobPropsFieldsLocal] = React.useState(
    false
  );
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});
  const [datePickerOpen, setDatePickerOpen] = React.useState(false);
  const [linkedJob, setLinkedJob] = React.useState(linkedJobParent);
  const [dates, setDates] = React.useState([
    new Date(initialFormData.dateBegin)
  ]);
  const [datePickerDisplayValue, setDatePickerDisplayValue] = React.useState(
    ''
  );
  const [submit, setSubmit] = React.useState();
  const jobWasDeleted = isUpdateForm && !linkedJob && formData.jobId != 0;
  const jobsPresent = jobs.length > 0;
  const showJobsDropdown = jobsPresent;
  const noJobSelected = formData.jobId == 0;
  const showJobsNameInput = formData.jobId == 0 || jobWasDeleted;
  const showJobPropsFields =
    settings?.allowCustomJobPropsInRecordForm ||
    jobWasDeleted ||
    showJobPropsFieldsLocal ||
    formData.jobId == 0;
  const showSickLeave = settings.sickleaveOnNewRecordForm || isUpdateForm;
  const { showBonusField } = settings;
  const formIsHalfTouched =
    Object.values(touched).length > 0 &&
    Object.values(touched).length != Object.values(formData).length;

  ScrollToTopOnMount();

  React.useEffect(() => {
    if (dates.length === 0) {
      setDatePickerDisplayValue('please select a date');
    } else if (dates.length === 1) {
      setDatePickerDisplayValue(
        new Date(dates[0])?.toLocaleDateString(settings.language, {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })
      );
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
        payload: { [name]: value }
      });
    }
  }

  function handleSelectJobChange(e) {
    const { value } = e.target;
    const selectedJobId = +value;
    const job = jobs.find((job) => job.id === selectedJobId);
    const {
      id: jobId = 0,
      jobName: jobName = '',
      /* eslint-disable no-unused-vars */
      trackOverTime,
      trackEarnings,
      /* eslint-enable no-unused-vars */
      ...rest
    } = job || {};
    setLinkedJob(job);

    setFormData({
      ...formData,
      ...rest,
      jobId,
      jobName
    });

    setTouched({
      ...touched,
      jobId: true,
      jobName: true
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
    jobId: validateNumber,
    jobName: validateNotEmpty,
    dates: validateDates,
    begin: validateTime,
    end: validateTime,
    hoursUnpaid: validateNumber,
    dayHours: validateNumber,
    rate: validateNumber,
    bonus: validateNumber,
    monthlyIncome: validateNumber,
    weekHours: validateNumber,
    daysPerWeek: validateNumber,
    paymentType: validateNotEmpty
  };

  function handleValidation({ name, value }) {
    // spread existing errors: possibly existing error of current field, and ...rest (remove existing error)
    // eslint-disable-next-line no-unused-vars
    const { [name]: removedErrorWhatever, ...restErrors } = errors;

    const error = validate[name](value, name);

    setErrors({
      ...restErrors,
      ...(error && { [name]: touched[name] && error })
    });
  }

  function validateNotEmpty(value, name = 'unnamed field') {
    if (value.trim() === '') {
      return name + ' is required (is empty)';
    }
    return null;
  }

  function validateDates(value) {
    if (!value?.length) {
      return 'no dates selected';
    }

    return null;
  }

  function validateTime(value) {
    const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;

    if (!value.match(timeRegex)) {
      return `${value} not in HH:mm format`;
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

  // handle Submission

  function handleSubmit(e) {
    e.preventDefault();
    const formDataKeys = Object.keys(formData);
    const formValidation = formDataKeys.reduce(
      (acc, key) => {
        const hasValidationFunction = typeof validate[key] === 'function';
        const newError = hasValidationFunction // validation whole form
          ? validate[key](formData[key], key)
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
        // errors: { ...errors },
        // touched: { ...touched }
        errors: {},
        touched: {}
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

  function handleDispatch(formData) {
    dates.forEach((date) => {
      const singleDateFormData = {
        ...formData,
        dateBegin: date
      };
      saveRecord(singleDateFormData);
    });
    history.push('/calendar');
  }

  function handleDelete() {
    deleteItem({ type: 'record', id: formData.id });
    history.push('/calendar');
  }

  return (
    <>
      <Prompt message="Discard unsaved changes?" when={formIsHalfTouched} />
      <LogToScreen title="touched" object={touched} settings={settings} />
      <LogToScreen title="errors" object={errors} settings={settings} />
      <LogToScreen
        title="showJobsDropdown"
        object={{
          showJobsDropdown,
          jobWasDeleted,
          jobsPresent,
          linkedJob: '' + linkedJob,
          isUpdateForm
        }}
        settings={settings}
      />

      <form
        className="form-record"
        // ref={form}
        onSubmit={handleSubmit}
        data-record-id={formData.recordId}
        autoComplete="off"
      >
        <FormButtonRow>
          <Button actionType="cancel">Cancel</Button>
          <Button type="submit" data-button-submit="">
            Save
          </Button>
        </FormButtonRow>
        <div className="form-body has-fixed-button-row">
          <input type="hidden" name="id" value={formData.id} />

          <fieldset>
            {showJobsDropdown && (
              <FormElement
                label="Select saved job"
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
                  <option key={`job-0`} value={0}>
                    None
                  </option>
                  {jobs.map((job) => (
                    <option key={`job-${job.id}`} value={job.id}>
                      {job.jobName}
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
                  required={true}
                />
              </FormElement>
            )}
          </fieldset>
          {jobWasDeleted && (
            <p>
              <small>
                This record was attached to a job which was since deleted. You
                can still edit contents and provide a diffrent Jobname.
              </small>
            </p>
          )}

          <fieldset>
            <FormElement label="Select Dates...">
              <input
                name="datesDisplay"
                id="datesDisplay"
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
              dates={[...dates]}
              updateDates={handleDatesChange}
              clock={clock}
              records={records}
              jobs={jobs}
              setDatePickerDisplayValue={setDatePickerDisplayValue}
            />

            <FormElement
              error={errors.begin}
              touched={touched.begin}
              htmlFor="begin"
              label="Starts"
            >
              <input
                name="begin"
                id="begin"
                type="time"
                value={formData.begin}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormElement>

            <FormElement
              error={errors.end}
              touched={touched.end}
              htmlFor="end"
              label="Ends"
            >
              <input
                name="end"
                id="end"
                type="time"
                value={formData.end}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormElement>
          </fieldset>

          {showBonusField && (
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
          )}
          {showSickLeave && (
            <fieldset>
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
            </fieldset>
          )}

          {!settings?.allowCustomJobPropsInRecordForm && !noJobSelected && (
            <fieldset>
              <FormElement
                label="Override Reporting (Job-) properties"
                htmlFor="showJobPropsFieldsLocal"
              >
                <input
                  type="checkbox"
                  checked={showJobPropsFieldsLocal}
                  name="showJobPropsFieldsLocal"
                  id="showJobPropsFieldsLocal"
                  value={showJobPropsFieldsLocal}
                  onChange={() => {
                    setShowJobPropsFieldsLocal(!showJobPropsFieldsLocal);
                  }}
                  // handleBlur={handleBlur}
                />
              </FormElement>
            </fieldset>
          )}
          {showJobPropsFields && (
            <>
              <fieldset>
                <legend>Reporting Settings</legend>
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
                    required={true}
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
                {linkedJob?.paymentType !== 'OFFhourly' && (
                  <>
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
                        required={true}
                      />
                    </FormElement>

                    <FormElement
                      label="Rate"
                      error={errors.rate}
                      touched={touched.rate}
                      htmlFor="rate"
                      disabled={formData.paymentType === 'monthly'}
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
                        disabled={formData.paymentType === 'monthly'}
                      />
                    </FormElement>

                    <FormElement
                      label="dayHours"
                      error={errors.dayHours}
                      touched={touched.dayHours}
                      htmlFor="dayHours"
                      disabled={formData.paymentType === 'monthly'}
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
                        disabled={formData.paymentType === 'monthly'}
                      />
                    </FormElement>
                  </>
                )}
                {linkedJob?.paymentType !== 'OFFmonthly' && (
                  <>
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
                      disabled={formData.paymentType === 'hourly'}
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
                        disabled={formData.paymentType === 'hourly'}
                      />
                    </FormElement>
                  </>
                )}
              </fieldset>
            </>
          )}

          {Object.values(errors).length !== 0 && <p>There were ERRORS</p>}
          {isUpdateForm && (
            <Button
              type="button"
              onClick={() => {
                if (
                  window.confirm(
                    'Are you sure to permanently delete this record?'
                  )
                ) {
                  handleDelete();
                }
                // setDialogOpen(true);
              }}
              className="btn--delete"
              data-button-delete=""
            >
              Delete Record
            </Button>
          )}
        </div>
      </form>
      <LogToScreen title="formData" object={formData} settings={settings} />
      <LogToScreen title="settings" object={settings} settings={settings} />
      <LogToScreen title="dates" object={dates} settings={settings} />
      <LogToScreen title="linkedJob" object={linkedJob} settings={settings} />

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
