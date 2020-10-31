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
  const [datePickerOpen, setDatePickerOpen] = React.useState(false);
  const form = React.useRef();
  const [dates, setDates] = React.useState(initialFormData.dates);
  const [datePickerDisplayValue, setDatePickerDisplayValue] = React.useState(
    ''
  );

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
    if (e.target.name === 'jobName') {
      console.log(e.target.value);
      dispatch({
        type: 'setPreviousJobName',
        payload: { name: e.target.value }
      });
    }
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value
    });
  }

  function handleSelectJobChange(e) {
    if (e.target.value == 0) {
      return;
    }
    const selectedJobId = parseInt(e.target.value);
    const job = jobs.find((job) => job.id === selectedJobId);

    dispatch({ type: 'setPreviousJobId', payload: { id: selectedJobId } });

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      ['rate']: job?.rate || formData.rate,
      ['jobName']: job?.name || ''
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

  function handleCalendarDateButtonClick() {
    console.log('Date Click');
  }

  function handleDelete() {
    deleteItem({ type: 'record', id: formData.id });
    history.push('/');
  }

  return (
    <>
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
          <fieldset>
            <div className="form-el">
              <label htmlFor="jobName">Job Name</label>
              <input
                name="jobName"
                id="jobName"
                type="text"
                value={formData.jobName}
                onChange={handleChange}
              />
              {/* <p>
              <small>Job will be added to saved Jobs.</small>
            </p> */}
            </div>
          </fieldset>
        )}
        <fieldset>
          <FormElement
            name="dates-field"
            id="dates-field"
            value={datePickerDisplayValue}
            variant="dates field value"
            readOnly={true}
            onClick={() => setDatePickerOpen(!datePickerOpen)}
          >
            Date
          </FormElement>

          <DatesPickerCalendar
            inputDate={inputDate}
            settings={settings}
            onCalendarDateButtonClick={handleCalendarDateButtonClick}
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
              onChange={handleChange}
            >
              Starts
            </FormElement>

            <FormElement
              id="entry-end-time"
              name="timeEnd"
              type="time"
              value={formData.timeEnd}
              onChange={handleChange}
            >
              Ends
            </FormElement>
          </FormElementSet>
        </fieldset>

        <fieldset>
          <FormElementSet>
            <FormElement
              name="timeUnpaid"
              id="entry-unpaid-time"
              type="number"
              step="0.1"
              value={formData.unpaidTime}
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
            onChange={handleChange}
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
