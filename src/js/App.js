import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from 'react-router-dom';

import Home from './components/Home';
import Add from './components/Add';
import Calendar from './components/Calendar';

import '../css/index.css';

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add">Add</Link>
          </li>
        </ul>
      </nav>
      <main className="main">
        <Switch>
          <Route exact path="/" component={Calendar} />
          <Route path="/add" component={Add} />
          <Route path="*" component={NoMatch} />
        </Switch>
      </main>
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
