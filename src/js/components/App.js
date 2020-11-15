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
import Dashboard from './Dashboard';
import SegmentNav from './SegmentNav';
import AppHeader from './AppHeader';
import Clock from './Clock';
import Calendar from './Calendar';

const pages = [
  {
    name: 'View',
    id: 'view',
    segments: [
      {
        name: 'Dashboard',
        id: 'dashboard'
      },
      {
        name: 'Calendar',
        id: 'calendar'
      },
      {
        name: 'List',
        id: 'list'
      }
    ]
  },
  { name: 'Add', id: 'add' },
  { name: 'Settings', id: 'settings' }
];

export default function App() {
  const clock = useClock();
  const [appData, dispatch] = useLocalStorageReducer();
  const [state, setState] = React.useState();
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

  function handleDateClick(e) {
    setInputDate(new Date(e.currentTarget.parentElement.dataset.dateString));
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

  return (
    <React.StrictMode>
      <Router>
        {isLoggedIn && <Navigation pages={pages} />}
        <main className="main">
          <AppHeader>
            <h1>View</h1>
            <Clock />
          </AppHeader>
          <Switch>
            {/* <Route exact path="/">
              <View
                inputDate={inputDate}
                settings={settings}
                changeMonth={changeMonth}
                changeDate={changeDate}
                records={records}
                setInputDate={setInputDate}
                jobs={jobs}
                clock={clock}
              />
            </Route> */}
            <Route exact path="/">
              <Dashboard jobs={jobs} settings={settings} records={records}>
                <SegmentNav />
              </Dashboard>
            </Route>

            <Route exact path="/calendar">
              <SegmentNav />
              <Calendar
                inputDate={inputDate}
                settings={settings}
                handleDateClick={handleDateClick}
                setInputDate={setInputDate}
                records={records}
                changeDate={changeDate}
                changeMonth={changeMonth}
                jobs={jobs}
              >
                <p>Lonely Child</p>
              </Calendar>
            </Route>

            <Route exact path="/reporting">
              <Reporting
                inputDate={inputDate}
                settings={settings}
                changeMonth={changeMonth}
                setInputDate={setInputDate}
                changeDate={changeDate}
                records={records}
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
