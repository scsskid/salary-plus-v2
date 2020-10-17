import React from 'react';
import { mapFormDataToStorageObject, mutateArrayWithObject } from './helpers';
import { sampleData, bootstrapData } from '../../data/data';
/**
 *
 * @param {String} key The key to set in localStorage for this value
 * @param {Object} defaultValue The value to use if it is not already in localStorage
 * @param {{serialize: Function, deserialize: Function}} options The serialize and deserialize functions to use (defaults to JSON.stringify and JSON.parse respectively)
 */

function init(initialData) {
  console.log('init reducer', initialData);
  return initialData;
}

function reducer(state, { type, payload }) {
  console.log(`reducer: [ ${type} ]`, payload);
  const freshNess = new Date().toISOString();
  const nextPresetId = state?.settings?.incrementIdPresets + 1;
  const nextJobId = state?.settings?.incrementIdJobs + 1;
  const nextRecordId = state?.settings?.incrementIdRecords + 1;

  switch (type) {
    case 'createRecord':
      payload.id = nextRecordId;
      return {
        ...state,
        records: [...state.records, mapFormDataToStorageObject(payload)],
        settings: {
          ...state.settings,
          incrementIdRecords: nextRecordId
        }
      };
    case 'updateRecord':
      return {
        ...state,
        records: mutateArrayWithObject(
          mapFormDataToStorageObject(payload),
          state.records
        )
      };
    case 'createJob':
      payload.id = nextJobId;
      return {
        ...state,
        jobs: [...state.jobs, payload],
        settings: {
          ...state.settings,
          incrementIdJobs: nextJobId
        }
      };
    case 'updateJob':
      return {
        ...state,
        jobs: mutateArrayWithObject(payload, state.jobs)
      };
    case 'createPreset':
      payload.id = nextPresetId;
      return {
        ...state,
        presets: [...state.presets, payload],
        settings: {
          ...state.settings,
          incrementIdPresets: nextPresetId
        }
      };
    case 'updatePreset':
      return {
        ...state,
        presets: mutateArrayWithObject(payload, state.presets)
      };
    case 'reset':
      return init({
        ...bootstrapData,
        app: { ...bootstrapData.app, freshNess }
      });
    case 'deleteAppData':
      return init({});
    case 'insertSampleData':
      return init({ ...sampleData, app: { ...sampleData.app, freshNess } });
    default:
      break;
  }
}

function useLocalStorageReducer() {
  const key = bootstrapData.app.localStorageKey;
  const localStorageValue = JSON.parse(window.localStorage.getItem(key)) || {};
  const [appData, dispatch] = React.useReducer(
    reducer,
    localStorageValue,
    init
  );

  React.useEffect(() => {
    // console.log('appData write', appData);
    window.localStorage.setItem(key, JSON.stringify(appData));
  }, [appData]);

  return [appData, dispatch];
}

export { useLocalStorageReducer };

/*
function useLocalStorageState(
  key,
  defaultValue = '',
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
) {
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key);
    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage);
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
  });

  const prevKeyRef = React.useRef(key);

  React.useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, serialize(state));
  }, [key, state, serialize]);

  return [state, setState];
}
*/
