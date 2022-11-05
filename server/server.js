const express = require('express');
const path = require('path');
const app = express();
const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT;

const apiRouter = require('./api.js')

if (NODE_ENV === 'production') {
    // statically serve everything in the webpack build for production
    app.use('/dist', express.static(path.join(__dirname, '../dist')));
  }

// process data body and images 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serve up the index file
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

// direct to the aipr router
app.use('/api', apiRouter);

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

app.listen(PORT); 
