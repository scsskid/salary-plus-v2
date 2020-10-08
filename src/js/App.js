import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Add from './components/Add';
import Calendar from './components/Calendar';
import Welcome from './components/Welcome';
import NoMatch from './components/NoMatch';
import '../css/index.css';
import sampleData from '../data/sample-data';
import Nav from './components/Nav';
import { useLocalStorageState } from './utils/store';

const App = () => {
  const [inputDate, setInputDate] = React.useState(new Date());
  const [appData, setAppData] = useLocalStorageState(
    'salary-plus:app-data',
    null
  );

  let startPage; // in State?

  function insertSampleData() {
    setAppData(sampleData);
  }

  function insertBootstrapData() {
    setAppData({
      ...sampleData,
      records: [],
      jobs: [],
      patterns: [],
      user: {
        name: 'Anonymous'
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

  if (appData === null) {
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

  return (
    <Router>
      <Nav />
      <main className="main">
        <Switch>
          <Route exact path="/">
            {startPage}
          </Route>

          <Route path="/add" component={Add} />
          <Route path="*" component={NoMatch} />
        </Switch>
      </main>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
