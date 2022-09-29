import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
import 'babel-polyfill';
//this applies new hooks (check on App)
import { BrowserRouter } from 'react-router-dom';

import './scss/app.scss';

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);