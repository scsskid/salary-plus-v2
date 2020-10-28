import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigaton = () => {
  return (
    <nav className="main-navigation">
      <ul>
        <NavEl route="/">View</NavEl>
        <NavEl route="/records/add">Add</NavEl>
        <NavEl route="/settings">Settings</NavEl>
      </ul>
    </nav>
  );
};

export default Navigaton;

function NavEl({ route, children }) {
  const location = useLocation();
  const isCurrentPath = location.pathname === route;
  const defaultClassName = 'main-navigation-el';

  return (
    <li
      className={
        isCurrentPath
          ? `${defaultClassName} main-navigation-el--is-current`
          : defaultClassName
      }
    >
      <Link to={route}>{children}</Link>
    </li>
  );
}
