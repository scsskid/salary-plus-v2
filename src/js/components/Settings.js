import React from 'react';
import { useHistory } from 'react-router-dom';
import FormElement from './FormElement';
import FormElementSet from './FormElementSet';

export default function Settings({ jobs, children, settings, dispatch }) {
  const history = useHistory();

  const {
    allowCustomJobProps = false,
    sickleaveOnNewRecordForm = false
  } = settings;

  const [formData, setFormData] = React.useState({
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

    // Save as Previous FromData

    dispatch({
      type: 'updateSetting',
      payload: { [name]: type === 'checkbox' ? checked : value }
    });
  }

  React.useEffect(() => {
    console.log(settings);
    window.scrollTo(0, 0);
  }, [history]);

  return (
    <>
      <form>
        <fieldset>
          <FormElementSet>
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
          </FormElementSet>
          <FormElementSet>
            <FormElement label="Allow manual jobs properties in Records Entry">
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
          </FormElementSet>
          <FormElementSet>
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
          </FormElementSet>
        </fieldset>
        <fieldset>
          <FormElementSet>
            <FormElement label="Jobs">
              <button onClick={() => history.push('/jobs')}>
                {jobs.length} →
              </button>
            </FormElement>
          </FormElementSet>
        </fieldset>
      </form>
      {children}
    </>
  );
}
