import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import MainView from './components/MainView';

import '../css/index.css';
import Navigation from './components/Navigation';

const App = () => {
  return (
    <div className="container">
      <Header />
      <MainView />
      <Navigation />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

console.log('foo');
