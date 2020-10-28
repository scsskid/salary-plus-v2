import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import View from './View';
import Welcome from './Welcome';
import NoMatch from './NoMatch';
import Navigation from './Navigation';
import Settings from './Settings';
import { useLocalStorageReducer } from '../utils/store';
import {
  getDaysInMonth,
  getFirstDay,
  getDateFromFormInputDate,
  throttle,
  setAppInnerHeight
} from '../utils/helpers.js';
import { getRecordsByDate, getRecordsByMonth } from '../utils/dataHelpers.js';
import { FormRecordCreate, FormRecordUpdate } from './FormRecord';
import { FormJobCreate, FormJobUpdate } from './FormJob';
import { FormPresetCreate, FormPresetUpdate } from './FormPreset';
import Debug from './Debug';

export default function App() {
  const [inputDate, setInputDate] = React.useState(new Date());
  const [appData, dispatch] = useLocalStorageReducer();
  const isLoggedIn = Object.entries(appData).length > 0;
  const { settings = {}, records = [], jobs = [], presets = [] } = appData;

  function updateInputDate(date) {
    setInputDate(date);
  }

  React.useEffect(() => {
    window.addEventListener('resize', throttle(setAppInnerHeight));
    setAppInnerHeight();
  }, []);

  // make higher order fn
  function saveRecord(formData) {
    dispatch({
      type: 'id' in formData ? 'updateRecord' : 'createRecord',
      payload: formData
    });
    updateInputDate(getDateFromFormInputDate(formData.dateBegin));
  }

  function saveJob(formData) {
    dispatch({
      type: 'id' in formData ? 'updateJob' : 'createJob',
      payload: formData
    });
  }

  function savePreset(formData) {
    dispatch({
      type: 'id' in formData ? 'updatePreset' : 'createPreset',
      payload: formData
    });
  }

  function deleteItem({ type, id }) {
    dispatch({
      type: `delete${type.charAt(0).toUpperCase() + type.slice(1)}`,
      payload: { id }
    });
  }

  const monthRecords = getRecordsByMonth({
    records,
    date: inputDate
  });

  const dateRecords = getRecordsByDate({
    records: monthRecords,
    date: inputDate
  });
  const firstDay = getFirstDay(inputDate);

  const daysInMonth = getDaysInMonth(inputDate);

  function changeMonth(summand = 0) {
    const newDate = new Date(inputDate);
    const now = new Date();
    newDate.setMonth(inputDate.getMonth() + summand);

    if (
      now.getMonth() == newDate.getMonth() &&
      now.getFullYear() == newDate.getFullYear()
    ) {
      newDate.setDate(now.getDate());
    } else {
      newDate.setDate(1);
    }

    setInputDate(summand === 0 ? now : newDate);
  }

  if (!isLoggedIn) {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Welcome
              seedFunctions={{
                insertSampleData: () => dispatch({ type: 'insertSampleData' }),
                insertBootstrapData: () => dispatch({ type: 'reset' })
              }}
            />
            <Debug />
          </Route>
          <Route path="*" component={NoMatch} />
        </Switch>
      </Router>
    );
  }

  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <main className="main">
        <Switch>
          <Route exact path="/">
            <View
              inputDate={inputDate}
              settings={settings}
              changeMonth={changeMonth}
              monthRecords={monthRecords}
              daysInMonth={daysInMonth}
              updateInputDate={updateInputDate}
              firstDay={firstDay}
              jobs={jobs}
              dateRecords={dateRecords}
            />
          </Route>
          <Route path="/records/add">
            <FormRecordCreate
              inputDate={inputDate}
              jobs={jobs}
              presets={presets}
              settings={settings}
              saveRecord={saveRecord}
              dispatch={dispatch}
            />
          </Route>
          <Route path="/records/:id">
            <FormRecordUpdate
              jobs={jobs}
              presets={presets}
              records={records}
              saveRecord={saveRecord}
              deleteItem={deleteItem}
              dispatch={dispatch}
            />
          </Route>
          <Route path="/jobs/add">
            <FormJobCreate saveJob={saveJob} />
          </Route>
          <Route path="/jobs/:jobId">
            <FormJobUpdate
              jobs={jobs}
              saveJob={saveJob}
              deleteItem={deleteItem}
            />
          </Route>
          <Route path="/presets/add">
            <FormPresetCreate savePreset={savePreset} />
          </Route>
          <Route path="/presets/:presetId">
            <FormPresetUpdate
              presets={presets}
              savePreset={savePreset}
              deleteItem={deleteItem}
            />
          </Route>

          <Route path="/Settings">
            <Settings settings={settings} jobs={jobs} presets={presets}>
              <Debug
                settings={settings}
                dispatch={dispatch}
                isLoggedIn={isLoggedIn}
              />
            </Settings>
          </Route>
          <Route path="*" component={NoMatch} />
        </Switch>
      </main>
    </Router>
  );
}
