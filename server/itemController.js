const { model } = require('mongoose');
const models = require('./itemModels');
const db = require('./itemModels');

const itemController = {};

// read functionality
itemController.getGear = (req, res, next) => {
  models.Gear.find({}).exec()
  .then(gearDocs => {
    res.locals.gear = gearDocs;
    return next();
  })
  .catch(err => {
    return next({
      log: `itemController.getGear: ERROR: ${err}`,
      message: { err: 'Error occured in itemController.getGear. Check server logs for detials.' },
    });
  });
}

// create functionality
itemController.addGear = (req, res, next) => {
  const { itemName, itemDescription, numberAvailable } = req.body;
    models.Gear.create({
      itemName, itemDescription, numberAvailable
    })
    .then(gearDoc => {
      res.locals.newGear = gearDoc;
      return next();
    })
    .catch(err => {
      return next({
        log: `itemController.addGear: ERROR: ${err}`,
        message: { err: 'Error occured in itemController.addGear. Check server logs for detials.' }
      });
    });
}

// find item with ID 
itemController.getOneItem = (req, res, next) => {
  models.Gear.find({ _id: req.params.id }, (err, doc) => {
    if (err) { return next({
        log: `itemController.getOneItem: ERROR: ${err}`,
        message: { err: 'Error occured in itemController.getOneItem. Check server logs for detials.' }
      })}
    res.locals.ItemById = doc;
    return next();
  });
};

// update functionality (PUT)
itemController.updateItem = async (req, res, next) => {
  const { numberAvailable } = req.body;
  const updatedNumber = Number(numberAvailable);
  models.Gear.findByIdAndUpdate({ _id: req.params.id },
    { numberAvailable: updatedNumber }, { upsert: true }, function (err, docs) {
      if (err) {
        return next({
          log: `itemController.updateItem: ERROR: ${err}`,
          message: { err: 'Error occured in itemController.updateItem. Check server logs for detials.' }
        });
      } else {
        console.log(docs)
        res.locals.updatedGear = docs;
        return next();
      }
    })
  };

// delete functionality 
itemController.deleteItem = async (req, res, next) => {
  models.Gear.findByIdAndRemove({ _id: req.params.id },
    function (err, docs) {
      if (err) {
        return next({
          log: `itemController.deleteItem: ERROR: ${err}`,
          message: { err: 'Error occured in itemController.deleteItem. Check server logs for detials.' }
        });
      } else {
        console.log(docs)
        res.locals.deletedGear = docs;
        return next();
      }
    })
  };

module.exports = itemController;