import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.css';
import App from './pages/App';
// import {startServer} from './utils/server'
// import * as serviceWorker from './serviceWorker';
// startServer().then(value => console.log(value)).catch(err => console.log(err))

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
