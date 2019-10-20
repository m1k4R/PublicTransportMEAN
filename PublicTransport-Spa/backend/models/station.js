const mongoose = require('mongoose');
const { Schema } = mongoose;
const Address = require('./address');
const Location = require('./location');
const StationLine = require('./stationLine');
const Line = require('./line');
const AddressSchema = Address.schema;
const LocationSchema = Location.schema;
const StationLineSchema = StationLine.schema;
const LineSchema = Line.schema;

const StationSchema = new Schema ({
  //id: { type: Number },
  name: { type: String, required: true},
  address: { type: AddressSchema},
  location: { type: LocationSchema},
  //stationLines: { type: [StationLineSchema]},
  //lines: { type: [LineSchema]},
  lines: [{ type: Schema.Types.ObjectID, ref: 'Line'}]

});

module.exports = {
  schema: StationSchema,
  model: mongoose.model('Station', StationSchema)
}

//module.exports = mongoose.model('Station', StationSchema);
