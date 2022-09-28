const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const fs = require('fs');
const app = express();
const path = require('path');
const NODE_ENV = process.env.NODE_ENV;
const itemController = require('./itemController')
const db = require('./itemModels');

// if (NODE_ENV === 'production') {
    // statically serve everything in the webpack build 
    app.use('/dist', express.static(path.join(__dirname, '../dist')));
    // serve index.html on the route '/'
    app.get('/', (req, res) => {
      return res.status(200).sendFile(path.join(__dirname, '../index.html'));
    });
  // }

app.use(express.json());

const logger = function (req, res, next) {
  console.log('we have entered the GET request to /gear');
  return next();
}

app.get('/gear', logger, itemController.getGear, (req, res) => {
  // res.json(db.find({}));
  // should return an array of objects
  res.status(200).json(res.locals.gear);
})

app.post('/gear', itemController.addGear, (req, res) => {
  // should return an object
  res.status(200).json(res.locals.newGear);
})

// catch-all route handler for requests to unknown routes
app.use((req, res) => res.status(404).send('Page Not Found'));

// handler for controller errors
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });

app.listen(3000); //listens on port 3000 -> http://localhost:3000/
