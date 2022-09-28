import React from 'react';
// import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import App from './App.jsx';
//this applies new hooks (check on App)
import { BrowserRouter } from 'react-router-dom';

import ItemContainer from './components/ItemContainer.jsx';

ReactDOM.render(
  <BrowserRouter>
    <div>this is a test div. can you see me? </div>
    <ItemContainer />
    {/* <App /> */}
  </BrowserRouter>,
  document.getElementById('root')
);
