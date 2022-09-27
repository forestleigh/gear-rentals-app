const db = require('./itemModels');

const itemController = {};

// read functionality
itemController.getGear = (req, res, next) => {
    const charQuery = ' SELECT * FROM Gear;';
    try {
      db.query(charQuery)
        .then((data) => {
          console.log(' card data: rows', data.rows[0]);
          res.locals.allCharacters = data.rows;
          return next();
        });
    } catch {
      return next({
        log: 'Error found in starWarsController.getCharacters', 
        message: { err: 'Characters not loading' }
      });
    }
};

// create functionality
itemController.addGear = (req, res, next) => {

};

// update functionality
itemController.updateGear = (req, res, next) => {

};

// delete functionality
itemController.deleteGear = (req, res, next) => {

};

module.exports = itemController;