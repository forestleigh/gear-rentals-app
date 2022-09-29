import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// need this when you use functional components in react
import props from 'prop-types';

import ItemContainer from './components/ItemContainer.jsx';
import ItemCreator from './components/ItemCreator.jsx';

import './scss/app.scss';

const App = props => {
  // make sure to use your Links ONLY within a <Router> context
  return (
      <div>
        <Routes>
          <Route path="/" element={<ItemContainer />} />
          <Route path="/create" element={<ItemCreator />} />
          {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
      </div>
  );
}

export default App;
















  // return (
  //   <div className="router">
  //     <main>
  //       {/*
  //           NOTE: The syntax below is for React-Router
  //             - A <Switch> looks through its children <Route>s and 
  //             renders the first one that matches the current URL.
  //             https://reacttraining.com/react-router/web/guides/quick-start
  //       */}
  //       <Routes>
  //         <Route
  //           exact
  //           path="/"
  //           component={ItemContainer}
  //         />
  //         <Route
  //           exact
  //           path="/create"
  //           component={ItemCreator}
  //         />
  //         {/* <Route
  //           exact
  //           path="/login"
  //           component={login}
  //         /> */}
  //       </Routes>
  //     </main>
  //   </div>
  // );
  //};