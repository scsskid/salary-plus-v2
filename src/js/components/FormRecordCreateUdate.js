import React from 'react';
import { useParams } from 'react-router-dom';
import FormRecord from './FormRecord';

export function FormRecordCreate({
  inputDate,
  saveRecord,
  jobs,
  settings,
  presets,
  dispatch,
  changeMonth
}) {
  const [selectedDates, setSelectedDates] = React.useState([]);

  return (
    <>
      <div className="component-header">
        <h1>New Entry</h1>
      </div>

      <FormRecord
        jobs={jobs}
        saveRecord={saveRecord}
        presets={presets}
        inputDate={inputDate}
        settings={settings}
        dispatch={dispatch}
        changeMonth={changeMonth}
        selectedDates={selectedDates}
        setSelectedDates={setSelectedDates}
      />
    </>
  );
}

export function FormRecordUpdate({
  saveRecord,
  jobs,
  records,
  presets,
  deleteItem,
  dispatch,
  settings,
  changeMonth,
  inputDate
}) {
  const params = useParams();
  const record = records?.find((record) => record.id === parseInt(params?.id));

  return (
    <>
      <div className="component-header">
        <h1>Update Entry</h1>
      </div>
      <FormRecord
        jobs={jobs}
        saveRecord={saveRecord}
        deleteItem={deleteItem}
        presets={presets}
        isUpdateForm={true}
        record={record}
        dispatch={dispatch}
        settings={settings}
        changeMonth={changeMonth}
        inputDate={inputDate}
      />
    </>
  );
}
