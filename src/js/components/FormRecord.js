import React from 'react';
import Button from './Button';
import FormElement from './FormElement';
import DatesPickerCalendar from './DatesPickerCalendar';
import { useHistory } from 'react-router-dom';
import FormElementSet from './FormElementSet';

export default function FormRecord({
  saveRecord,
  deleteItem,
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
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});
  const [datePickerOpen, setDatePickerOpen] = React.useState(false);
  const form = React.useRef();
  const [dates, setDates] = React.useState(initialFormData.dates);
  const [datePickerDisplayValue, setDatePickerDisplayValue] = React.useState(
    ''
  );

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

  function OptionsJob() {
    return jobs.map((job) => {
      return (
        <option key={`job-${job.id}`} value={job.id}>
          {job.name} {job.rate}
        </option>
      );
    });
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

    // Save as Previous FromData
    if (!isUpdateForm) {
      dispatch({
        type: 'setPreviousFormDataProp',
        payload: { [e.target.name]: e.target.value }
      });
    }
  }

  function validateJobName(name, value) {
    console.log('validateJobName:', name, value);

    if (value.trim() === '') {
      console.log('is empty');
      return 'jobName is required (is empty)';
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
    console.log('validateNumber:', name, value);
  }

  const validate = {
    jobName: validateJobName,
    timeBegin: validateTime,
    timeEnd: validateTime,
    hoursUnpaid: validateNumber,
    rate: validateNumber,
    bonus: validateNumber
  };

  function handleBlur(e) {
    const { name, value } = e.target;
    const error = validate[name](name, value);

    //spread existing errors: possibly existing error of current field, and ...rest
    const { [name]: removedErrorWhatever, ...restErrors } = errors;
    console.log('blur, validate', name, value, error);

    setErrors({
      ...restErrors,
      ...(error && { [name]: error })
    });
  }

  function handleSelectJobChange(e) {
    if (e.target.value == 0) {
      return;
    }
    const selectedJobId = parseInt(e.target.value);
    const job = jobs.find((job) => job.id === selectedJobId);

    dispatch({
      type: 'setPreviousFormDataProp',
      payload: { jobId: selectedJobId }
    });

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      ['rate']: job?.rate || formData.rate,
      ['jobName']: job?.name || formData.jobName
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleDispatch(formData);
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
      <pre style={{ fontSize: '12px' }}>{JSON.stringify(errors, null, 2)}</pre>
      <form
        className="form-record"
        ref={form}
        onSubmit={handleSubmit}
        data-record-id={formData.recordId}
      >
        <input type="hidden" name="id" value={formData.id} />

        {jobs.length ? (
          <fieldset>
            <div className="form-el">
              <label htmlFor="entry-job">Job</label>
              <select
                name="jobId"
                id="entry-job"
                value={formData.jobId}
                onBlur={handleSelectJobChange}
                onChange={handleSelectJobChange}
              >
                <option key={`job-0`} disabled={true} value={0}>
                  Select Job...
                </option>
                <OptionsJob />
              </select>
            </div>
          </fieldset>
        ) : (
          <></>
        )}

        <fieldset>
          <FormElement
            name="jobName"
            id="jobName"
            value={formData.jobName}
            handleChange={handleChange}
            handleBlur={handleBlur}
          >
            Job Name
          </FormElement>
        </fieldset>
        <fieldset>
          <FormElement
            name="dates"
            id="dates"
            value={datePickerDisplayValue}
            variant="dates field value"
            readOnly={true}
            handleClick={() => setDatePickerOpen(!datePickerOpen)}
            handleChange={() => {
              console.log('handleChange dates-field');
            }}
          >
            Date
          </FormElement>

          <DatesPickerCalendar
            inputDate={inputDate}
            settings={settings}
            isUpdateForm={isUpdateForm}
            changeMonth={changeMonth}
            datePickerOpen={datePickerOpen}
            dates={dates}
            setDates={setDates}
          />

          <FormElementSet>
            <FormElement
              name="timeBegin"
              id="entry-begin-time"
              type="time"
              value={formData.timeBegin}
              handleChange={handleChange}
              handleBlur={handleBlur}
            >
              Starts
            </FormElement>

            <FormElement
              id="entry-end-time"
              name="timeEnd"
              type="text"
              value={formData.timeEnd}
              handleChange={handleChange}
              handleBlur={handleBlur}
            >
              Ends
            </FormElement>
          </FormElementSet>
        </fieldset>

        <fieldset>
          <FormElementSet>
            <FormElement
              name="hoursUnpaid"
              id="entry-unpaid-hours"
              type="number"
              step="0.1"
              value={formData.hoursUnpaid}
              handleChange={handleChange}
              handleBlur={handleBlur}
              placeholder="0"
            >
              Unpaid Time
            </FormElement>
          </FormElementSet>

          <FormElementSet>
            <FormElement
              inputMode="decimal"
              variant="currency"
              name="rate"
              id="entry-rate"
              type="number"
              step="0.01"
              value={formData.rate}
              handleChange={handleChange}
              handleBlur={handleBlur}
              placeholder="0"
            >
              Rate
            </FormElement>
            <FormElement
              inputMode="decimal"
              variant="currency"
              name="bonus"
              id="entry-bonus"
              type="number"
              step="0.01"
              value={formData.bonus}
              handleChange={handleChange}
              handleBlur={handleBlur}
              placeholder="0"
            >
              Bonus
            </FormElement>
          </FormElementSet>
        </fieldset>
        <fieldset>
          <FormElement
            name="sickLeave"
            id="entry-sick-leave"
            type="checkbox"
            value={formData.sickLeave}
            handleChange={handleChange}
            checked={formData.sickLeave}
          >
            Sick Leave?
          </FormElement>
        </fieldset>

        <Button type="submit" data-button-submit="">
          Save
        </Button>
        {isUpdateForm && (
          <Button
            onClick={handleDelete}
            className="btn-delete"
            data-button-delete=""
          >
            Delete Record
          </Button>
        )}
      </form>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </>
  );
}
