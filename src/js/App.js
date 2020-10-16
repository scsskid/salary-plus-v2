import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from 'react-router-dom';
import RecordForm from './components/RecordForm';
import Calendar from './components/Calendar';
import Welcome from './components/Welcome';
import NoMatch from './components/NoMatch';
import Navigation from './components/Navigation';
import Settings from './components/Settings';
import JobForm from './components/JobForm';
import { sampleData, bootstrapData } from '../data/sample-data';
import { useLocalStorageReducer } from './utils/store';
import {
  mutateArrayWithObject,
  getDateFromFormInputDate
} from './utils/helpers';
import '../css/index.css';

const App = () => {
  const history = useHistory();
  const [inputDate, setInputDate] = React.useState(new Date());
  const [appData, dispatch] = useLocalStorageReducer(bootstrapData);

  const { records, jobs, settings, app, presets } = appData;

  let startPage; // in State?

  function insertSampleData() {
    dispatch({ type: 'insertSampleData', payload: sampleData });
  }

  function insertBootstrapData() {
    dispatch({ type: 'start' });
  }

  const changeMonth = (summand = 0) => {
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
  };

  const updateInputDate = (date) => {
    setInputDate(date);
  };

  if (app.state === 'welcome') {
    startPage = (
      <Welcome seedFunctions={{ insertSampleData, insertBootstrapData }} />
    );
  } else {
    const records = appData.records;
    startPage = (
      <Calendar
        inputDate={inputDate}
        changeMonth={changeMonth}
        updateInputDate={updateInputDate}
        records={records}
        jobs={jobs}
        settings={settings}
      />
    );
  }

  function saveRecord(formData) {
    const action = {
      type: parseInt(formData.id) === 0 ? 'createRecord' : 'updateRecord',
      payload: formData
    };
    dispatch(action);
    updateInputDate(getDateFromFormInputDate(formData.dateBegin));
  }

  function saveJob(formData) {
    console.log(formData);
    formData.id = parseInt(formData.id);
    const action = {
      type: formData.id === 0 ? 'createJob' : 'updateJob',
      payload: formData
    };
    dispatch(action);
  }

  function handleResetApp() {
    setAppData({ ...appData, app: { ...app, state: 'welcome' } });
    setInputDate(new Date());

    history.push('/');
  }

  return (
    <Router>
      {app.state !== 'welcome' && <Navigation />}
      <main className="main">
        <Switch>
          <Route exact path="/">
            {startPage}
          </Route>

          <Route path="/add">
            <RecordForm
              mode={`insert`}
              inputDate={inputDate}
              jobs={jobs}
              settings={settings}
              saveRecord={saveRecord}
            />
          </Route>

          <Route path="/jobs/:jobId">
            <JobForm jobs={jobs} saveJob={saveJob} />
          </Route>
          <Route path="/records/:id">
            <RecordForm
              mode={`update`}
              jobs={jobs}
              settings={settings}
              records={records}
              saveRecord={saveRecord}
            />
          </Route>
          <Route path="/records">
            <NoMatch />
          </Route>

          <Route path="/Settings">
            <Settings
              settings={settings}
              jobs={jobs}
              saveJob={saveJob}
              presets={presets}
            />
          </Route>
          <Route path="*" component={NoMatch} />
        </Switch>
      </main>
      <AppFooter appState={app.state}>
        {app.state !== 'welcome' && (
          <>
            <p>What</p>
            <button className="btn" onClick={handleResetApp}>
              Reset App
            </button>
            <pre>userSettings: {JSON.stringify(settings, null, 2)}</pre>
          </>
        )}
      </AppFooter>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

function AppFooter({ appState, children }) {
  return (
    <footer style={{ paddingTop: 40 }}>
      {appState !== 'welcome' && <>{children}</>}
      <div style={{ fontSize: '.8rem', opacity: 0.5 }}>state: {appState}</div>
    </footer>
  );
}
