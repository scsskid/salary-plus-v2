import React from 'react';
import { mapFormDataToStorageObject, mutateArrayWithObject } from './helpers';
import { sampleData, bootstrapData } from '../../data/data';

function init(initialData) {
  return initialData;
}

function reducer(state, { type, payload }) {
  console.log(`reducer: [ ${type} ]`, payload);

  // const freshNess = new Date().toISOString();
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
          inputJobId: nextJobId,
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
        settings: {
          ...state.settings,
          inputJobId: 0
        },
        jobs: state.jobs.filter((job) => {
          return job.id != payload.id;
        })
      };
    case 'setPreviousFormDataProp':
      return {
        ...state,
        settings: {
          ...state.settings,
          inputJobId: payload.jobId,
          previousFormData: {
            ...state.settings.previousFormData,
            ...payload
          }
        }
      };
    case 'updateSetting':
      return {
        ...state,
        settings: { ...state.settings, ...payload }
      };
    case 'reset':
      return init({ ...bootstrapData });
    case 'deleteAppData':
      return init({});
    case 'insertSampleData':
      return init({ ...sampleData });
    case 'importData':
      return init({ ...payload });
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
    window.localStorage.setItem(key, JSON.stringify(appData));
  }, [appData]);

  return [appData, dispatch];
}

export { useLocalStorageReducer };
