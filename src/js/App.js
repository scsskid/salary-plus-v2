import React from 'react';
import ReactDOM from 'react-dom';

import '../css/index.css';

const App = () => {
  return (
    <div className="container">
      <h1>Salary Plus</h1>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

console.log('foo');
