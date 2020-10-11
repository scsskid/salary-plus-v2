import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AddRecord from './components/AddRecord';
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
      />
    );
  }

  function saveRecord(formData) {
    const newRecord = mapFormDataToStorageObject(formData);
    newRecord.id = settings.incrementIds.records + 1;
    setAppData({
      ...appData,
      settings: {
        ...settings,
        incrementIds: {
          ...appData.settings.incrementIds,
          records: appData.settings.incrementIds.records + 1
        }
      },
      records: [...records, newRecord]
    });
  }

  function saveJob(job) {
    const newJob = {
      id: parseInt(job.id),
      name: job.name,
      rate: parseInt(job.rate)
    };

    const newJobs = mutateArrayWithObject(newJob, appData.jobs);
    console.log('save Job', newJobs);
    setAppData({
      ...appData,
      jobs: newJobs
      // jobs: []
    });
  }

  function resetApp() {
    setAppData({ ...appData, app: { ...app, state: 'welcome' } });
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
            <AddRecord
              inputDate={inputDate}
              jobs={jobs}
              settings={settings}
              saveRecord={saveRecord}
            />
          </Route>
          <Route path="/Settings">
            <Settings settings={settings} jobs={jobs} saveJob={saveJob} />
          </Route>
          <Route path="*" component={NoMatch} />
        </Switch>
      </main>
      <footer style={{ paddingTop: 40 }}>
        {app.state !== 'welcome' && (
          <button onClick={resetApp}>Reset App</button>
        )}
        <div style={{ fontSize: '.8rem', opacity: 0.5 }}>
          state: {app.state}
        </div>
      </footer>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
