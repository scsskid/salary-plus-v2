import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RecordForm from './components/RecordForm';
import Calendar from './components/Calendar';
import Welcome from './components/Welcome';
import NoMatch from './components/NoMatch';
import Navigation from './components/Navigation';
import Settings from './components/Settings';
import { useLocalStorageReducer } from './utils/store';
import { getDateFromFormInputDate, pad } from './utils/helpers';
import '../css/index.css';
import FormJobCreate from './components/FormJobCreate';
import FormJobUpdate from './components/FormJobUpdate';

const App = () => {
  const [inputDate, setInputDate] = React.useState(new Date());
  const [appData, dispatch] = useLocalStorageReducer();
  const isLoggedIn = Object.entries(appData).length > 0;
  const {
    app = {},
    settings = {},
    records = [],
    jobs = [],
    presets = []
  } = appData;

  function updateInputDate(date) {
    setInputDate(date);
  }

  // make higher order fn
  function saveRecord(formData) {
    const action = {
      type: parseInt(formData.id) === 0 ? 'createRecord' : 'updateRecord',
      payload: formData
    };
    dispatch(action);
    updateInputDate(getDateFromFormInputDate(formData.dateBegin));
  }

  function saveJob(formData) {
    console.log(formData, formData.id, parseInt(formData.id));
    formData.id = parseInt(formData.id);
    const action = {
      type: isNaN(formData.id) ? 'createJob' : 'updateJob',
      payload: formData
    };
    dispatch(action);
  }

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

  function handleDeleteAppData() {
    dispatch({ type: 'deleteAppData' });
  }

  function insertSampleData() {
    dispatch({ type: 'insertSampleData' });
  }

  function insertBootstrapData() {
    dispatch({ type: 'reset' });
  }

  if (!isLoggedIn) {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Welcome
              seedFunctions={{ insertSampleData, insertBootstrapData }}
            />
            <AppFooter />
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
            <Calendar
              inputDate={inputDate}
              changeMonth={changeMonth}
              updateInputDate={updateInputDate}
              records={records}
              jobs={jobs}
              settings={settings}
            />
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
          <Route path="/jobs/add">
            <FormJobCreate saveJob={saveJob} />
          </Route>
          <Route path="/jobs/:jobId">
            <FormJobUpdate saveJob={saveJob} />
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
      <AppFooter appState={app?.state} isLoggedIn inputDate>
        <>
          <button className="btn" onClick={insertBootstrapData}>
            Reset App (Bootstrap)
          </button>
          <button className="btn" onClick={handleDeleteAppData}>
            Delete App Data
          </button>
          <p>
            {`Jobs: ${jobs.length}`} {`Records: ${records.length}`}{' '}
          </p>
          <code>
            inputDate:{` `}
            {`${inputDate.getFullYear()}-${pad(inputDate.getMonth() + 1)}-${pad(
              inputDate.getDate()
            )}`}
          </code>

          <pre>userSettings: {JSON.stringify(settings, null, 2)}</pre>
        </>
      </AppFooter>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

function AppFooter({ isLoggedIn, children }) {
  return (
    <footer style={{ paddingTop: 40 }}>
      {isLoggedIn && <>{children}</>}
      <div style={{ fontSize: '.8rem', opacity: 0.5 }}>
        state: {isLoggedIn ? 'logged in' : 'logged out'}
      </div>
    </footer>
  );
}
