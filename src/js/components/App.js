import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
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
import { getRecordsByMonth } from '../utils/dataHelpers.js';
import { FormRecordCreate, FormRecordUpdate } from './FormRecordCreateUdate';
import { FormJobCreate, FormJobUpdate } from './FormJob';
import Debug from './Debug';
import Reporting from './Reporting';
import JobsList from './JobsList';
import useClock from '../hooks/useClock';
import Dashboard from './Dashboard';
import SegmentNav from './SegmentNav';
import AppHeader from './AppHeader';
import Clock from './Clock';
import Calendar from './Calendar';
import WidgetInputDate from './WidgetInputDate';
import RecordsList from './RecordsList';
import { WidgetInputJobId } from './WidgetInputJobId';

export default function App() {
  const clock = useClock();
  const [appData, dispatch] = useLocalStorageReducer();
  const [inputDate, setInputDate] = React.useState(() => new Date(clock.today));
  const isLoggedIn = Object.entries(appData).length > 0;
  const { settings = {}, jobs = [] } = appData;
  const records =
    settings.inputJobId == 0
      ? appData.records
      : appData.records?.filter((record) => {
          return record.jobId == settings.inputJobId;
        });

  React.useEffect(() => {
    // to hook, remove listener cleanup:
    window.addEventListener('resize', throttle(setAppInnerHeight));
    setAppInnerHeight();
  }, []);

  const monthRecords = getRecordsByMonth({
    records,
    date: inputDate
  });

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

  function handleInputJobIdChange(e) {
    const { value } = e.target;
    console.log('job change');
    dispatch({
      type: `updateSetting`,
      payload: { inputJobId: value }
    });
  }

  return (
    <React.StrictMode>
      <Router>
        {isLoggedIn && <Navigation />}
        <main className="main">
          {!isLoggedIn ? (
            <>
              <Welcome
                seedFunctions={{
                  insertSampleData: () =>
                    dispatch({ type: 'insertSampleData' }),
                  insertBootstrapData: () => dispatch({ type: 'reset' })
                }}
              />
              <Debug />
            </>
          ) : (
            <>
              <Route exact path="/">
                <Redirect to="/dashboard" />
              </Route>
              <Route path={['/dashboard', '/list', '/calendar']}>
                <AppHeader title="View">
                  <WidgetInputJobId
                    settings={settings}
                    jobs={jobs}
                    handleInputJobIdChange={handleInputJobIdChange}
                  />
                </AppHeader>
                <SegmentNav
                  segments={[
                    { title: 'Dashboard', path: '/dashboard' },
                    { title: 'Calendar', path: '/calendar' },
                    { title: 'List', path: '/list' }
                  ]}
                />
              </Route>
              <Switch>
                <Route exact path="/dashboard">
                  <Clock />
                  <Dashboard
                    jobs={jobs}
                    settings={settings}
                    records={records}
                  />
                </Route>
                <Route exact path="/calendar">
                  <Calendar
                    inputDate={inputDate}
                    settings={settings}
                    handleDateClick={handleDateClick}
                    setInputDate={setInputDate}
                    records={records}
                    changeDate={changeDate}
                    changeMonth={changeMonth}
                    jobs={jobs}
                    clock={clock}
                  />
                </Route>
                <Route exact path="/list">
                  <WidgetInputDate
                    inputDate={inputDate}
                    settings={settings}
                    changeMonth={changeMonth}
                    setInputDate={setInputDate}
                    changeDate={changeDate}
                  />
                  <RecordsList
                    jobs={jobs}
                    settings={settings}
                    inputDate={inputDate}
                    records={monthRecords}
                  />
                </Route>
                <Route exact path="/reporting">
                  <AppHeader title="Reporting">
                    <WidgetInputJobId
                      settings={settings}
                      jobs={jobs}
                      handleInputJobIdChange={handleInputJobIdChange}
                    />
                  </AppHeader>
                  <WidgetInputDate
                    inputDate={inputDate}
                    settings={settings}
                    changeMonth={changeMonth}
                    setInputDate={setInputDate}
                    changeDate={changeDate}
                  />
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
                  <AppHeader title="New" />
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
                  <AppHeader title="Update" />
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
                <Route exact path="/jobs/add">
                  <AppHeader title="Add Job" />
                  <FormJobCreate saveJob={saveJob} />
                </Route>
                <Route exact path="/jobs/:jobId">
                  <AppHeader title="Update Job" />
                  <FormJobUpdate
                    jobs={jobs}
                    saveJob={saveJob}
                    deleteItem={deleteItem}
                    changeMonth={changeMonth}
                  />
                </Route>
                <Route exact path="/jobs/">
                  <AppHeader title="Jobs" />
                  <JobsList jobs={jobs} />
                </Route>
                <Route path="/settings">
                  <AppHeader title="Settings" />
                  <Settings settings={settings} jobs={jobs} dispatch={dispatch}>
                    <Debug
                      settings={settings}
                      dispatch={dispatch}
                      isLoggedIn={isLoggedIn}
                    />
                  </Settings>
                </Route>
                <Route path="*">
                  <AppHeader title="Not Found" />
                  <NoMatch />
                </Route>
              </Switch>
            </>
          )}
        </main>
      </Router>
    </React.StrictMode>
  );
}
