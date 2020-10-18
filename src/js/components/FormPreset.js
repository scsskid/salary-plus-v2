import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Button from './Button';

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

export const FormPresetUpdate = function ({ presets, savePreset, deleteItem }) {
  const { presetId } = useParams();
  const history = useHistory();

  const preset = presets.find((preset) => preset.id === parseInt(presetId));

  console.log(presets, preset);

  function handleDispatch(formData) {
    savePreset(formData);
    history.push('/settings');
  }

  return (
    <>
      <h1>Update Preset</h1>
      <FormPreset
        handleDispatch={handleDispatch}
        preset={preset}
        deleteItem={deleteItem}
        history={history}
        isUpdateForm={true}
      />
    </>
  );
};

export default function FormPreset({
  handleDispatch,
  preset,
  deleteItem,
  history,
  isUpdateForm
}) {
  const [formData, setFormData] = React.useState(
    preset || {
      name: 'Unnamed Preset',
      timeBegin: '08:00',
      timeEnd: '17:00',
      rate: 0,
      id: 'AUTOINCREMENT'
    }
  );

  function handleSubmit(e) {
    e.preventDefault();
    handleDispatch(formData);
  }

  function handleDelete(e) {
    e.preventDefault();
    deleteItem({ type: 'preset', id: formData.id });
    history.push('/settings');
  }

  function handleChange(e) {
    // console.log(e.target.name);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <p>ID: {formData.id}</p>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
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
            value={formData.timeBegin}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="name">Time End</label>
          <input
            type="time"
            step="900"
            name="timeEnd"
            value={formData.timeEnd}
            onChange={handleChange}
          />
        </div>
        <div className="form-el">
          <label htmlFor="entry-rate">Rate</label>
          <input
            inputMode="decimal"
            name="rate"
            type="number"
            step="0.01"
            value={formData.rate}
            onChange={handleChange}
          />
          €
        </div>

        <div>
          {/* <button className="btn">Cancel</button> */}
          <Button type="submit" data-button-submit="">
            Save
          </Button>
          {isUpdateForm && (
            <Button
              onClick={handleDelete}
              className="btn-delete"
              data-button-delete=""
            >
              Delete Preset
            </Button>
          )}
        </div>
      </form>
    </>
  );
}
