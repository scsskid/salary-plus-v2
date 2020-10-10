import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AddRecord from './components/AddRecord';
import Calendar from './components/Calendar';
import Welcome from './components/Welcome';
import NoMatch from './components/NoMatch';
import '../css/index.css';
import sampleData from '../data/sample-data';
import Navigation from './components/Navigation';
import { useLocalStorageState } from './utils/store';
import { mapFormDataToStorageObject } from './utils/helpers';

const App = () => {
  const [inputDate, setInputDate] = React.useState(new Date());
  const [appData, setAppData] = useLocalStorageState('salary-plus:app-data', {
    app: {
      version: 'Beta0.2',
      state: 'welcome'
    },
    records: [],
    jobs: [],
    patterns: [],
    user: {
      name: 'Anonymous',
      settings: {},
      autoincrementIds: {
        records: 0,
        patterns: 0,
        jobs: 0
      }
    }
  });

  const { records, jobs, user, app, patterns } = appData;

  let startPage; // in State?

  function insertSampleData() {
    setAppData(sampleData);
  }

  function insertBootstrapData() {
    setAppData({
      ...appData,
      app: { ...app, state: 'running' },
      user: {
        ...user,
        name: 'Bootstrapper'
      }
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
      />
    );
  }

  function saveRecord(formData) {
    const newRecord = mapFormDataToStorageObject(formData);
    newRecord.id = user.autoincrementIds.records + 1;
    const newRecords = { ...records, newRecord };
    setAppData({ ...appData, newRecords });
  }

  function resetApp() {
    // setAppData();
  }

  return (
    <Router>
      <Navigation />
      <main className="main">
        <Switch>
          <Route exact path="/">
            {startPage}
          </Route>

          <Route path="/add">
            <AddRecord
              inputDate={inputDate}
              userJobs={jobs}
              user={user}
              saveRecord={saveRecord}
            />
          </Route>
          <Route path="*" component={NoMatch} />
        </Switch>
      </main>
      <div>
        <button onClick={resetApp}>Reset App</button>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
