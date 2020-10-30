import React from 'react';
import { formatDate, getTimeOfDate } from '../utils/helpers';
import Button from './Button';
import FormElement from './FormElement';
import DatesPickerCalendar from './DatesPickerCalendar';
import { useHistory } from 'react-router-dom';

export default function FormRecord({
  saveRecord,
  deleteItem,
  jobs,
  isUpdateForm,
  settings,
  inputDate,
  changeMonth,
  initialFormData
}) {
  const history = useHistory();
  const [formData, setFormData] = React.useState(initialFormData);
  const [datePickerOpen, setDatePickerOpen] = React.useState(false);
  const form = React.useRef();

  function handleDispatch(formData) {
    saveRecord(formData);
    history.push('/');
  }

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
    // Causes Bug
    // dispatch({ type: 'setPreviousJobId', payload: { id: selectedJobId } });

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
            name="dateBegin"
            id="entry-date-begin"
            value={formData.dateBegin}
            onChange={handleChange}
            variant="button"
            readOnly={true}
            onClick={() => {
              console.log('click');
              setDatePickerOpen(!datePickerOpen);
            }}
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
          />
          <FormElement
            name="timeBegin"
            id="entry-begin-time"
            type="time"
            value={formData.timeBegin}
            onChange={handleChange}
          >
            Begin Time
          </FormElement>

          <FormElement
            id="entry-end-time"
            name="timeEnd"
            type="time"
            value={formData.timeEnd}
            onChange={handleChange}
          >
            End Time
          </FormElement>
        </fieldset>
        <fieldset>
          <FormElement
            inputMode="decimal"
            variant="currency"
            name="rate"
            id="entry-rate"
            type="number"
            step="0.01"
            value={formData.rate}
            onChange={handleChange}
          >
            Rate
          </FormElement>
          {/* {jobs.length == 0 && (
            <p>
              <small>
                Rate will linked to above entered jobName and preset in this
                form when selecting this job.
              </small>
            </p>
          )} */}
          <FormElement
            inputMode="decimal"
            variant="currency"
            name="bonus"
            id="entry-bonus"
            type="number"
            step="0.01"
            value={formData.bonus}
            onChange={handleChange}
          >
            Bonus
          </FormElement>{' '}
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
