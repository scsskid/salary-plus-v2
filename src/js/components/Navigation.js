import React from 'react';
import { Link } from 'react-router-dom';

const Navigaton = () => {
  return (
    <nav className="main-navigation">
      <ul>
        <li>
          <Link to="/">View</Link>
        </li>
        <li>
          <Link to="/records/add">Add</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigaton;
