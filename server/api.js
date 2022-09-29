const express = require('express');

const itemController = require('./itemController.js');

const router = express.Router();

const loggerGET = function (req, res, next) {
    console.log('we have entered the GET requests');
    return next();
  }

  const loggerPOST = function (req, res, next) {
    console.log('we have entered the POST requests');
    return next();
  }

router.get('/',
loggerGET,
  itemController.getGear,
  (req, res) => res.status(200).json(res.locals.gear)
);

router.post('/gear',
loggerPOST,
  itemController.addGear,
  (req, res) => res.status(200).json('completed')
);

router.put('/gear/:id',
  itemController.updateGear,
  (req, res) => res.status(200).json('completed')
);

// router.patch('/gear/:id',
//   itemController.addGear,
//   (req, res) => res.status(200).json('completed')
// );

// router.delete('/gear',
//   itemController.addGear,
//   (req, res) => res.status(200).json('completed')
// );

module.exports = router;
