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
import { sampleData, bootstrapData } from '../data/sample-data';
import { useLocalStorageState } from './utils/store';
import {
  mapFormDataToStorageObject,
  mutateArrayWithObject
} from './utils/helpers';
import '../css/index.css';

const App = () => {
  const [inputDate, setInputDate] = React.useState(new Date());
  const [appData, setAppData] = useLocalStorageState(
    'salary-plus:app-data',
    bootstrapData
  );

  const { records, jobs, settings, app } = appData;

  let startPage; // in State?

  function insertSampleData() {
    setAppData(sampleData);
  }

  function insertBootstrapData() {
    setAppData({
      ...bootstrapData,
      app: { ...app, state: 'running' }
    });
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
    const id = parseInt(formData.id);
    const record = mapFormDataToStorageObject(formData);
    const dateBeginSplit = formData.dateBegin.split('/');
    const dateIsoString = `${dateBeginSplit[0]}-${dateBeginSplit[1]}-${dateBeginSplit[2]}`;
    let newRecords;
    let newSettings = appData.settings;

    if (id === 0) {
      record.id = settings.incrementIds.records + 1;
      newRecords = [...records, record];
      newSettings = {
        ...settings,
        incrementIds: {
          ...appData.settings.incrementIds,
          records: appData.settings.incrementIds.records + 1
        }
      };
    } else {
      newRecords = mutateArrayWithObject(record, records);
    }

    setAppData({
      ...appData,
      settings: newSettings,
      records: newRecords
    });
    updateInputDate(new Date(dateIsoString));
  }

  function saveJob(job) {
    const newJob = {
      id: parseInt(job.id),
      name: job.name,
      rate: parseInt(job.rate)
    };

    const newJobs = mutateArrayWithObject(newJob, appData.jobs);
    setAppData({
      ...appData,
      jobs: newJobs
    });
  }

  function resetApp() {
    setAppData({ ...appData, app: { ...app, state: 'welcome' } });
    setInputDate(new Date());
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
            <Settings settings={settings} jobs={jobs} saveJob={saveJob} />
          </Route>
          <Route path="*" component={NoMatch} />
        </Switch>
      </main>
      <AppFooter appState={app.state} settings={settings} resetApp={resetApp} />
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

function AppFooter({ appState, resetApp, settings }) {
  const history = useHistory();
  function handleClick() {
    resetApp();
    history.push('/');
  }

  return (
    <footer style={{ paddingTop: 40 }}>
      {appState !== 'welcome' && (
        <>
          <button className="btn" onClick={handleClick}>
            Reset App
          </button>

          <pre>userSettings: {JSON.stringify(settings, null, 2)}</pre>
        </>
      )}
      <div style={{ fontSize: '.8rem', opacity: 0.5 }}>state: {appState}</div>
    </footer>
  );
}
