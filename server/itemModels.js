const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://theforestleigh:Lav12022%21@cluster0.ol71v7m.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  // sets the name of the DB
  dbName: 'apline-club-gear'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;
const gearSchema = new Schema({
  itemName: String,
  itemDescription: String,
  numberAvailable: Number,
});

const Gear = mongoose.model('gear', gearSchema)

// these models are used in the controller
module.exports = {Gear};