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

// find item with ID (for use in all following controller functions)
itemController.getOneItem = (req, res, next) => {
  const _id = req.query.id;
  models.Gear.find({ _id }, (err, doc) => {
    if (err) { return next({
        log: `itemController.getOneItem: ERROR: ${err}`,
        message: { err: 'Error occured in itemController.getOneItem. Check server logs for detials.' }
      })}
    res.locals.ItemById = doc;
    return next();
  });
};

// update functionality (PUT)
itemController.updateItem = (req, res, next) => {
  model.Gear.findByIdAndUpdate(req.params.id, req.body).exec()
  .then(updatedDoc => {
    if (!updatedDoc) {return res.status(404).end(); }
    res.locals.updatedGear = updatedDoc;
    return next();
  })
  .catch(err => {
    return next({
        log: `itemController.updateItem: ERROR: ${err}`,
        message: { err: 'Error occured in itemController.updateItem. Check server logs for detials.' }
    });
  });
};

// delete functionality
itemController.deleteItem = (req, res, next) => {
  models.Gear.findByIdAndRemove(req.params.id).exec()
  .then(doc => {
    if (!doc) {return res.status(404).end(); }
    res.locals.deletedGear = doc;
    return next();
  })
  .catch(err => {
    return next({
      log: `itemController.deleteItem: ERROR: ${err}`,
      message: { err: 'Error occured in itemController.deleteItem. Check server logs for detials.' }
    });
  });
}

// // update functionality (PATCH)
// itemController.editGear = (req, res, next) => {
//   const _id = req.query.id;
//   // const { itemName, itemDescription, numberAvailable } = req.body;
//   models.Gear.findByIdAndUpdate( _id , req.body, {new: true}).exec()
//     .then(gearDoc => {
//       res.locals.updatedGear = gearDoc;
//     })
//     .catch(err => {
//       next({
//         log: `itemController.updateGear: ERROR: ${err}`,
//         message: { err: 'Error occured in itemController.updateGear. Check server logs for detials.' },
//       });
//     });
// };

// // delete functionality
// itemController.deleteGear = (req, res, next) => {

// };

module.exports = itemController;