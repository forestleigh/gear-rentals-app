import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'babel-polyfill';
//this applies new hooks (check on App)
import { BrowserRouter } from 'react-router-dom';

import './scss/app.scss';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);