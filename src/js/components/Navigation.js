import React from 'react';
import { Link } from 'react-router-dom';

const Navigaton = () => {
  return (
    <nav className="Nav">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/add">Add</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigaton;
