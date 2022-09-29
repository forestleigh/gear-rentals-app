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
  (req, res) => res.status(201).json(res.locals.newGear)
);

router.patch('/gear/:id',
  // itemController.getOneItem,
  itemController.updateItem,
  (req, res) => res.status(200).json(res.locals.updatedGear)
);

router.delete('/gear/:id',
  // itemController.getOneItem,
  itemController.deleteItem,
  (req, res) => res.status(200).json(res.locals.deletedGear)
);

module.exports = router;
