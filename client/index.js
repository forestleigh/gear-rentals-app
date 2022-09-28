import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
import 'babel-polyfill';
//this applies new hooks (check on App)
import { BrowserRouter } from 'react-router-dom';

import './scss/app.scss';

import ItemContainer from './components/ItemContainer.jsx';

// render(
//   <BrowserRouter>
//     <div>this is a test div. can you see me? </div>
//     {/* <ItemContainer /> */}
//     {/* <App /> */}
//   </BrowserRouter>,
//   document.getElementById('root')
// );

render(
    <ItemContainer />,
  document.getElementById('root')
);