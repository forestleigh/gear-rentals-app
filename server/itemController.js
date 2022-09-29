const models = require('./itemModels');
const db = require('./itemModels');

const itemController = {};

// read functionality
itemController.getGear = (req, res, next) => {
  models.Gear.find({}).exec()
  .then(gearDocs => {
    res.locals.gear = gearDocs;
    next();
  })
  .catch(err => {
    next({
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
      next();
    })
    .catch(err => {
      next({
        log: `itemController.addGear: ERROR: ${err}`,
        message: { err: 'Error occured in itemController.addGear. Check server logs for detials.' },
      });
    });
}

// update functionality (PUT)
itemController.updateGear = (req, res, next) => {
  const { _id, itemName, itemDescription, numberAvailable } = req.body;
  models.Gear.findByIdAndUpdate( _id , req.body, {new: true}).exec()
    .then(gearDoc => {
      res.locals.updatedGear = gearDoc;
    })
    .catch(err => {
      next({
        log: `itemController.updateGear: ERROR: ${err}`,
        message: { err: 'Error occured in itemController.updateGear. Check server logs for detials.' },
      });
    });
};

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