import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.css';
// import { addListeners } from '../utils/book';
import App from './pages/main';


//TODO: For the logo use Egyptian like symbols for the character glyphs
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
