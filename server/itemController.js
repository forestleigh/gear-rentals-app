const models = require('./itemModels');

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
itemController.addGear = async (req, res, next) => {
  const { itemName, itemDescription, numberAvailable } = req.body;
  // if (itemName && itemDescription && numberAvailable) {
    models.Gear.create({
      itemName, itemDescription, numberAvailable
    })
    .then(gearDoc => {
      res.locals.gear = gearDoc;
      next();
    })
    .catch(err => {
      next({
        log: `itemController.addGear: ERROR: ${err}`,
        message: { err: 'Error occured in itemController.addGear. Check server logs for detials.' },
      });
    });
  // }
}

// update functionality
itemController.updateGear = (req, res, next) => {
  
};

// delete functionality
itemController.deleteGear = (req, res, next) => {

};

module.exports = itemController;