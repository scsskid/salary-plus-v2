import * as React from 'react';
import { useHistory } from 'react-router-dom';
import FormElement from './FormElement';

export default function Settings({ jobs, children, settings, dispatch }) {
  const history = useHistory();

  const {
    language = 'en-US',
    allowCustomJobProps = false,
    sickleaveOnNewRecordForm = false
  } = settings;

  const [formData, setFormData] = React.useState({
    language,
    allowCustomJobProps,
    sickleaveOnNewRecordForm
  });

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

    dispatch({
      type: 'updateSetting',
      payload: { [name]: type === 'checkbox' ? checked : value }
    });
  }

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [history]);

  return (
    <>
      <form>
        <fieldset>
          <FormElement label="Select Language" htmlFor="language">
            <select
              name="language"
              id="language"
              value={formData.language}
              onBlur={handleChange}
              onChange={handleChange}
            >
              <option value="en-US">English (US)</option>
              <option value="de-DE">Deutsch</option>
              <option value="es-ES">Español</option>
              <option value="fr-FR">Français</option>
              <option value="dk-DK">Dansk</option>
            </select>
          </FormElement>

          <FormElement label="Always allow manual jobs properties in Records Entry">
            <input
              type="checkbox"
              checked={formData.allowCustomJobProps}
              name="allowCustomJobProps"
              id="allowCustomJobProps"
              value={formData.allowCustomJobPropse}
              onChange={handleChange}
              onBlur={handleChange}
            />{' '}
          </FormElement>

          <FormElement label="Display Sick Leave when adding new record">
            <input
              type="checkbox"
              checked={formData.sickleaveOnNewRecordForm}
              name="sickleaveOnNewRecordForm"
              id="sickleaveOnNewRecordForm"
              value={formData.sickleaveOnNewRecordForme}
              onChange={handleChange}
              onBlur={handleChange}
            />{' '}
          </FormElement>
        </fieldset>
        <fieldset>
          <FormElement label="Jobs">
            <button onClick={() => history.push('/jobs')}>
              {jobs.length} →
            </button>
          </FormElement>
        </fieldset>
        <fieldset>
          <FormElement label="Show { debug } infos across the app">
            <input
              type="checkbox"
              checked={formData.showDebugInfo}
              name="showDebugInfo"
              id="showDebugInfo"
              value={formData.showDebugInfo}
              onChange={handleChange}
              onBlur={handleChange}
            />{' '}
          </FormElement>
        </fieldset>
      </form>
      {children}
    </>
  );
}
