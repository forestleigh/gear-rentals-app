import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
//this applies new hooks (check on App)
import { BrowserRouter } from 'react-router-dom';


render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);