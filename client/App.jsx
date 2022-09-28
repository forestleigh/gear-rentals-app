import React from 'react';
import { Routes ,Route } from 'react-router-dom';

import ItemContainer from './components/ItemContainer.jsx';
import ItemCreator from './components/ItemCreator.jsx';

import './scss/app.scss';

const App = props => {
  return (
    <div className="router">
      <main>
        {/*
            NOTE: The syntax below is for React-Router
              - A <Switch> looks through its children <Route>s and 
              renders the first one that matches the current URL.
              https://reacttraining.com/react-router/web/guides/quick-start
        */}
        <Routes>
          <Route
            exact
            path="/"
            component={ItemContainer}
          />
          <Route
            exact
            path="/create"
            component={ItemCreator}
          />
          {/* <Route
            exact
            path="/login"
            component={login}
          /> */}
        </Routes>
      </main>
    </div>
  );
};

export default App;