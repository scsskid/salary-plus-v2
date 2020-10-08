import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { shiftRecordsDates } from './helpers/helpers';
import Add from './components/Add';
import Calendar from './components/Calendar';
import NoMatch from './components/NoMatch';
import '../css/index.css';
import Nav from './components/Nav';
import sampleData from '../data/sample-data';

const App = () => {
  const [inputDate, setInputDate] = React.useState(new Date());
  const changeInputDate = () => {
    setInputDate(new Date('1982-10-04'));
  };

  const updateInputDate = (summand = 0) => {
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

  const dataShifted = shiftRecordsDates({ data: sampleData, summand: 0 });

  // console.log(JSON.stringify(dataShifted));
  console.table(dataShifted.records.slice(0, 50));

  return (
    <Router>
      <Nav />
      <main className="main">
        <Switch>
          <Route exact path="/">
            <Calendar inputDate={inputDate} changeMonth={updateInputDate} />
          </Route>

          <Route path="/add" component={Add} />
          <Route path="*" component={NoMatch} />
        </Switch>
      </main>
      <button onClick={changeInputDate}>Change Date to 1982</button>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
