import React from 'react';
import { useHistory } from 'react-router-dom';

export const FormPresetCreate = function ({ savePreset }) {
  const history = useHistory();

  function handleDispatch(formData) {
    savePreset(formData);
    history.push('/settings');
  }

  return (
    <>
      <h1>Add New Preset</h1>
      <FormPreset handleDispatch={handleDispatch} />
    </>
  );
};

export const FormPresetUpdate = function ({ savePreset }) {
  const history = useHistory();

  function handleDispatch(formData) {
    savePreset(formData);
    history.push('/settings');
  }

  return (
    <>
      <h1>Update Preset</h1>
      <FormPreset handleDispatch={handleDispatch} />
    </>
  );
};

export default function FormPreset({ handleDispatch, id }) {
  const [state, setState] = React.useState({
    name: '',
    timeBegin: '08:00',
    timeEnd: '17:00',
    rate: '17:00',
    id: typeof id === 'undefined' ? 'AUTOINCREMENT' : id
  });

  function handleSubmit(e) {
    e.preventDefault();
    handleDispatch(state);
  }

  function handleChange(e) {
    // console.log(e.target.name);
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <p>ID: {id}</p>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
            required
            placeholder="Enter a Preset name..."
          />
        </div>
        <div>
          <label htmlFor="name">Time Begin</label>
          <input
            type="time"
            step="900"
            name="timeBegin"
            value={state.timeBegin}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="name">Time End</label>
          <input
            type="time"
            step="900"
            name="timeEnd"
            value={state.timeEnd}
            onChange={handleChange}
          />
        </div>

        <div>
          {/* <button className="btn">Cancel</button> */}
          <button className="btn" type="submit">
            Save
          </button>
        </div>
      </form>
    </>
  );
}
