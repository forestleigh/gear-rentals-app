const db = require('./itemModels');
const mongoose = require('mongoose');

const itemController = {};

// read functionality
itemController.getGear = async (req, res, next) => {
  const allGear = await db.find({});

  try {
    res.locals.gear = allGear;
    next();
  } catch (error) {
    next({
        log: 'Error getting gear in itemController.getGear',
        status: 500,
        message: { err: error },
      })
  }
};

// create functionality
itemController.addGear = async (req, res, next) => {
  const {itemName, itemDescription, numberAvailable } = req.body;
  if (!itemName | !itemDescription | !numberAvailable) {
    console.log('incomplete req.body');
    next({
      log: 'Error adding new gear as some fields are undefined',
      status: 500,
      message: { err: 'Some fields undefined' },
    })
  }

  const newGear = new Gear ({
    itemName: itemName,
    itemDescription: itemDescription,
    numberAvailable: numberAvailable
  })
  newGear.save()
    .then((result) => {
      res.locals.newGear = {
        message: "User Created Successfully",
        result,
      };
      next();
    })
    .catch((error) => {
      next({
        log: 'Error adding new gear in itemController.addGear',
        status: 500,
        message: { err: error },
      })
    });
};

// update functionality
itemController.updateGear = (req, res, next) => {
  
};

// delete functionality
itemController.deleteGear = (req, res, next) => {

};

module.exports = itemController;