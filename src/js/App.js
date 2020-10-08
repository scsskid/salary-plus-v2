import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  useLocation
} from 'react-router-dom';

import Add from './components/Add';
import Calendar from './components/Calendar';

import '../css/index.css';
import Nav from './components/Nav';

const App = () => {
  const [inputDate, setInputDate] = React.useState(new Date());
  console.log(inputDate);

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

function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h1>404</h1>
      <p>
        Not found: <code>{location.pathname}</code>
      </p>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
