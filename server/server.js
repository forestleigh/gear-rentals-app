const express = require('express');
const app = express();
const path = require('path');
const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === 'production') {
    // statically serve everything in the webpack build 
    app.use('/dist', express.static(path.join(__dirname, '../dist')));
    // serve index.html on the route '/'
    app.get('/', (req, res) => {
      return res.status(200).sendFile(path.join(__dirname, '../index.html'));
    });
  }

app.use(express.json());

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
