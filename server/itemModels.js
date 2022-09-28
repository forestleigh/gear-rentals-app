const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://theforestleigh:Lav12022%21@cluster0.ol71v7m.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  //   these are options to ensure that the connection is done properly
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'alpine-gear'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const gearSchema = new Schema({
  itemName: { type: String, required: true },
  itemDescription: { type: String, required: true },
  numberAvailable: { type: Number, required: true },
});

const Gear = mongoose.model('gear', gearSchema);

// these models are used in the controller
module.exports = {Gear};