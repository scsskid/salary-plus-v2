import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import IconView from './../../icons/icon-view.svg';
import IconAdd from './../../icons/icon-add.svg';
import IconSettings from './../../icons/icon-settings.svg';

const Navigaton = () => {
  return (
    <nav className="main-navigation">
      <ul>
        <NavEl route="/">
          <IconView />
          View
        </NavEl>
        <NavEl route="/records/add">
          <IconAdd />
          Add
        </NavEl>
        <NavEl route="/settings">
          <IconSettings />
          Settings
        </NavEl>
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
