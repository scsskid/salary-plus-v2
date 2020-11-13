import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import View from './View';
import Welcome from './Welcome';
import NoMatch from './NoMatch';
import Navigation from './Navigation';
import Settings from './Settings';
import { useLocalStorageReducer } from '../utils/store';
import {
  throttle,
  setAppInnerHeight,
  getWeekStartDateOffset
} from '../utils/helpers.js';
import { getRecordsByMonth, getRecordsByRange } from '../utils/dataHelpers.js';
import { FormRecordCreate, FormRecordUpdate } from './FormRecordCreateUdate';
import { FormJobCreate, FormJobUpdate } from './FormJob';
import Debug from './Debug';
import Reporting from './Reporting';
import JobsList from './JobsList';
import { useClock } from '../utils/hooks.js';

export default function App() {
  const clock = useClock();
  const [appData, dispatch] = useLocalStorageReducer();
  const [inputDate, setInputDate] = React.useState(() => new Date(clock.today));
  const isLoggedIn = Object.entries(appData).length > 0;
  const { settings = {}, records = [], jobs = [] } = appData;

  // Effects

  React.useEffect(() => {
    // to hook, remove listener cleanup:
    window.addEventListener('resize', throttle(setAppInnerHeight));
    setAppInnerHeight();
  }, []);

  // Store CRUD

  // make higher order fn
  function saveRecord(formData) {
    dispatch({
      type: 'id' in formData ? 'updateRecord' : 'createRecord',
      payload: formData
    });
    setInputDate(new Date(formData.dateBegin));
  }

  function saveJob(formData) {
    dispatch({
      type: 'id' in formData ? 'updateJob' : 'createJob',
      payload: formData
    });
  }

  function deleteItem({ type, id }) {
    dispatch({
      type: `delete${type.charAt(0).toUpperCase() + type.slice(1)}`,
      payload: { id }
    });
  }

  // InputDate Derived Values

  const monthRecords = getRecordsByMonth({
    records,
    date: clock.today
  });

  // Fns to Drill

  function changeMonth(summand = 0) {
    const inputDateCopy = (function () {
      const date = new Date(inputDate.getTime());
      date.setHours(0, 0, 0, 0);
      date.setDate(1);
      return date;
    })();

    inputDateCopy.setMonth(inputDateCopy.getMonth() + summand);

    if (
      clock.today.getMonth() == inputDateCopy.getMonth() &&
      clock.today.getFullYear() == inputDateCopy.getFullYear()
    ) {
      inputDateCopy.setDate(clock.today.getDate());
    } else {
      inputDateCopy.setDate(1);
    }

    setInputDate(summand === 0 ? clock.today : inputDateCopy);
  }

  function changeDate(summand = 0) {
    const inputDateCopy = (function () {
      const date = new Date(inputDate.getTime());
      date.setHours(0, 0, 0, 0);
      date.setDate(1);
      return date;
    })();

    inputDateCopy.setDate(inputDate.getDate() + summand);
    inputDateCopy.setDate(getWeekStartDateOffset(inputDateCopy));
    setInputDate(inputDateCopy);
  }

  if (!isLoggedIn) {
    return (
      <Router>
        <main className="main">
          <Switch>
            <Route exact path="/">
              <Welcome
                seedFunctions={{
                  insertSampleData: () =>
                    dispatch({ type: 'insertSampleData' }),
                  insertBootstrapData: () => dispatch({ type: 'reset' })
                }}
              />
              <Debug />
            </Route>
            <Route path="*" component={NoMatch} />
          </Switch>
        </main>
      </Router>
    );
  }

  // console.log(clock);

  return (
    <React.StrictMode>
      <Router>
        {isLoggedIn && <Navigation />}
        <main className="main">
          <Switch>
            <Route exact path="/">
              <View
                inputDate={inputDate}
                settings={settings}
                changeMonth={changeMonth}
                changeDate={changeDate}
                records={records}
                monthRecords={monthRecords}
                setInputDate={setInputDate}
                jobs={jobs}
                clock={clock}
              />
            </Route>
            <Route exact path="/reporting">
              <Reporting
                inputDate={inputDate}
                settings={settings}
                changeMonth={changeMonth}
                records={monthRecords}
                setInputDate={setInputDate}
                changeDate={changeDate}
              />
            </Route>
            <Route path="/records/add">
              <FormRecordCreate
                inputDate={inputDate}
                jobs={jobs}
                settings={settings}
                saveRecord={saveRecord}
                dispatch={dispatch}
                changeMonth={changeMonth}
              />
            </Route>
            <Route path="/records/:id">
              <FormRecordUpdate
                jobs={jobs}
                records={records}
                saveRecord={saveRecord}
                deleteItem={deleteItem}
                dispatch={dispatch}
                settings={settings}
                changeMonth={changeMonth}
                inputDate={inputDate}
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
                changeMonth={changeMonth}
              />
            </Route>
            <Route path="/jobs/">
              <JobsList jobs={jobs} />
            </Route>
            <Route path="/settings">
              <Settings settings={settings} jobs={jobs}>
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
    </React.StrictMode>
  );
}
