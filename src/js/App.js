import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Add from './components/Add';
import Calendar from './components/Calendar';
import NoMatch from './components/NoMatch';
import '../css/index.css';
import Nav from './components/Nav';

const App = () => {
  const [inputDate, setInputDate] = React.useState(new Date());

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

  // console.log(JSON.stringify(dataShifted));
  // console.table(dataShifted.records.slice(0));

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
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
