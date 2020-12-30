import * as React from 'react';
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
import {
  getRecordsByMonth,
  getUnattachedRecords
} from '../utils/dataHelpers.js';
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
import Notification from './Notification';
import RecordsList from './RecordsList';
import { WidgetInputJobId } from './WidgetInputJobId';
import ErrorBoundary from './ErrorBoundary';
import useNotification from '../hooks/useNotification';
import { Workbox, messageSW } from 'workbox-window';

function SWWrapper() {
  const [showPrompt, setShowPrompt] = React.useState(false);
  const wb = new Workbox('/service-worker.js');

  let registration;

  const handlers = {
    // `event.wasWaitingBeforeRegister` will be false if this is
    // the first time the updated service worker is waiting.
    // When `event.wasWaitingBeforeRegister` is true, a previously
    // updated service worker is stil l waiting.
    // You may want to customize the UI prompt accordingly.

    // Assumes your app has some sort of prompt UI element
    // that a user can either accept or reject.

    onAccept: async () => {
      // Assuming the user accepted the update, set up a listener
      // that will reload the page as soon as the previously waiting
      // service worker has taken control.
      wb.addEventListener('controlling', (event) => {
        window.location.reload();
      });

      if (registration && registration.waiting) {
        // Send a message to the waiting service worker,
        // instructing it to activate.
        // Note: for this to work, you have to add a message
        // listener in your service worker. See below.
        messageSW(registration.waiting, { type: 'SKIP_WAITING' });
      }
    },

    onReject: () => {
      setShowPrompt(false);
    }
  };

  React.useEffect(() => {
    // Add an event listener to detect when the registered
    // service worker has installed but is waiting to activate.
    wb.addEventListener('waiting', handleSWWaiting);
    wb.addEventListener('externalwaiting', handleSWWaiting);

    wb.register().then((r) => {
      console.log(r);
      registration = r;
    });
  });

  function handleSWWaiting() {
    setShowPrompt(true);
  }

  function createUIPrompt(onAccept, onReject) {
    return (
      <div>
        <h1>Update Available</h1>
        <p>
          <button onClick={onReject}>Not now</button>{' '}
          <button onClick={onAccept}>Install</button>
        </p>
      </div>
    );
  }

  return showPrompt && createUIPrompt(handlers.onAccept, handlers.onReject);
}

export default function App() {
  const clock = useClock();
  const [appData, dispatch] = useLocalStorageReducer();
  const [notification, setNotification, mountingState] = useNotification();
  const [inputDate, setInputDate] = React.useState(() => new Date(clock.today));
  const appRunning = Object.entries(appData).length > 0;
  const { records = [], settings = {}, jobs = [], app = {} } = appData;
  const recordsByInputJob =
    settings.inputJobId == 0 || !settings.inputJobId
      ? records
      : records?.filter((record) => {
          return record.jobId == settings.inputJobId;
        });

  const unattachedRecords = getUnattachedRecords(appData?.records, jobs);
  const viewSegements = [
    { title: 'Dashboard', path: '/view/dashboard' },
    { title: 'Calendar', path: '/view/calendar' },
    { title: 'Reporting', path: '/view/reporting' }
  ];
  React.useEffect(() => {
    // to hook, remove listener cleanup:
    window.addEventListener('resize', throttle(setAppInnerHeight));
    setAppInnerHeight();
  }, []);

  const monthRecords = getRecordsByMonth({
    records: recordsByInputJob,
    date: inputDate
  });

  // make higher order fn
  function saveRecord(formData) {
    dispatch({
      type: 'id' in formData ? 'updateRecord' : 'createRecord',
      payload: formData
    });
    setInputDate(new Date(formData.dateBegin));
    setNotification('Record saved.');
  }

  function saveJob(formData) {
    dispatch({
      type: 'id' in formData ? 'updateJob' : 'createJob',
      payload: formData
    });
    setNotification('Job saved.');
  }

  function deleteItem({ type, id }) {
    const typeString = type.charAt(0).toUpperCase() + type.slice(1);

    dispatch({
      type: `delete${typeString}`,
      payload: { id }
    });
    setNotification(`${typeString} deleted.`);
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
    dispatch({
      type: `updateSetting`,
      payload: { inputJobId: value }
    });
  }

  return (
    <React.StrictMode>
      <ErrorBoundary appData={appData}>
        <Router>
          {appRunning && <Navigation />}
          <main className="main">
            {!appRunning ? (
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
                <Notification
                  notification={notification}
                  mountingState={mountingState}
                />

                <Route exact path="/view">
                  <Redirect to="/view/dashboard" />
                </Route>
                <Route exact path="/">
                  <Redirect to="/view/dashboard" />
                </Route>
                <Route
                  path={[
                    '/view/dashboard',
                    '/view/list',
                    '/view/calendar',
                    '/view/reporting'
                  ]}
                >
                  <AppHeader key="view" title="View">
                    <WidgetInputJobId
                      settings={settings}
                      jobs={jobs}
                      handleInputJobIdChange={handleInputJobIdChange}
                      unattachedRecordsCount={unattachedRecords.length}
                    />
                  </AppHeader>
                  <SegmentNav segments={viewSegements} />
                </Route>
                <Switch>
                  <Route exact path="/view/dashboard">
                    {/* <Clock /> */}
                    <Dashboard
                      jobs={jobs}
                      settings={settings}
                      records={recordsByInputJob}
                      setInputDate={setInputDate}
                    />
                  </Route>
                  <Route exact path="/view/calendar">
                    <Calendar
                      inputDate={inputDate}
                      settings={settings}
                      handleDateClick={handleDateClick}
                      setInputDate={setInputDate}
                      records={recordsByInputJob}
                      changeDate={changeDate}
                      changeMonth={changeMonth}
                      jobs={jobs}
                      clock={clock}
                    />
                  </Route>
                  <Route exact path="/view/list">
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
                  <Route exact path="/view/reporting">
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
                      records={recordsByInputJob}
                      jobs={jobs}
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
                      clock={clock}
                      records={records}
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
                      clock={clock}
                      setInputDate={setInputDate}
                    />
                  </Route>
                  <Route exact path="/jobs/add">
                    <AppHeader title="Add Job" />
                    <FormJobCreate saveJob={saveJob} settings={settings} />
                  </Route>
                  <Route exact path="/jobs/:jobId">
                    <AppHeader title="Update Job" />
                    <FormJobUpdate
                      jobs={jobs}
                      saveJob={saveJob}
                      deleteItem={deleteItem}
                      settings={settings}
                    />
                  </Route>
                  <Route exact path="/jobs/">
                    <AppHeader title="Jobs" />
                    <JobsList jobs={jobs} />
                  </Route>
                  <Route path="/settings">
                    <AppHeader title="Settings" />
                    <Settings
                      settings={settings}
                      jobs={jobs}
                      dispatch={dispatch}
                    >
                      <Debug
                        settings={settings}
                        dispatch={dispatch}
                        appRunning={appRunning}
                        version={app?.version}
                        appData={appData}
                        clock={clock}
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
            <SWWrapper />
          </main>
        </Router>
      </ErrorBoundary>
    </React.StrictMode>
  );
}

// if (
//   'serviceWorker' in navigator &&
//   process.env.NODE_ENV !== 'OFFdevelopment'
// ) {}
