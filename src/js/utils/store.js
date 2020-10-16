import React from 'react';
import { mapFormDataToStorageObject, mutateArrayWithObject } from './helpers';

/**
 *
 * @param {String} key The key to set in localStorage for this value
 * @param {Object} defaultValue The value to use if it is not already in localStorage
 * @param {{serialize: Function, deserialize: Function}} options The serialize and deserialize functions to use (defaults to JSON.stringify and JSON.parse respectively)
 */

function reducer(state, { type, payload }) {
  console.log(`reducer: [ ${type} ]`, payload);
  state.app.freshNess = new Date().toISOString();
  switch (type) {
    case 'createRecord':
      payload.id = state.settings.incrementIds.records;
      return {
        ...state,
        records: [...state.records, mapFormDataToStorageObject(payload)],
        settings: {
          ...state.settings,
          incrementIds: {
            ...state.incrementIds,
            records: state.settings.incrementIds.records + 1
          }
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

    case 'start':
      state.app.state = 'running';
      return { ...state };
    case 'insertSampleData':
      return { ...state, ...payload };
    default:
      break;
  }
}

function useLocalStorageReducer(defaultValue) {
  const key = defaultValue.app.localStorageKey;
  const localStorageValue = JSON.parse(window.localStorage.getItem(key));
  const [appData, dispatch] = React.useReducer(
    reducer,
    localStorageValue || defaultValue
  );

  React.useEffect(() => {
    console.log('appData write', appData);
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
