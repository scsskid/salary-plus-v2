import * as React from 'react';
import ReactDOM from 'react-dom';
import '../css/index.css';
import App from './components/App';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function (reg) {
      if (reg.installing) {
        console.log('Service worker installing');
      } else if (reg.waiting) {
        console.log('Service worker installed');
      } else if (reg.active) {
        console.log('Service worker active');
      }
    })
    .catch(function (error) {
      // registration failed
      console.log('Registration failed with ' + error);
    });
}

ReactDOM.render(<App />, document.getElementById('root'));
