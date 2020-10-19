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
  return initialData;
}

function reducer(state, { type, payload }) {
  console.log(`reducer: [ ${type} ]`, payload);

  // const freshNess = new Date().toISOString();
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
          incrementIdRecords: nextRecordId,
          previousTimeBegin: payload.timeBegin,
          previousTimeEnd: payload.timeEnd
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
    case 'deleteRecord':
      return {
        ...state,
        records: state.records.filter((record) => {
          return record.id != payload.id;
        })
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
    case 'deleteJob':
      return {
        ...state,
        jobs: state.jobs.filter((job) => {
          return job.id != payload.id;
        })
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
    case 'deletePreset':
      return {
        ...state,
        presets: state.presets.filter((preset) => {
          return preset.id != payload.id;
        })
      };
    case 'setPreviousJobId':
      return {
        ...state,
        settings: {
          ...state.settings,
          previousJobId: payload.id
        }
      };
    case 'setPreviousTimeBegin':
      return {
        ...state,
        settings: {
          ...state.settings,
          previousTimeBegin: payload.timeBegin
        }
      };
    case 'setPreviousTimeEnd':
      return {
        ...state,
        settings: {
          ...state.settings,
          previousTimeEnd: payload.timeEnd
        }
      };

    case 'reset':
      return init({ ...bootstrapData });
    case 'deleteAppData':
      return init({});
    case 'insertSampleData':
      return init({ ...sampleData });
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
