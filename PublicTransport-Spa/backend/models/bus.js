const mongoose = require('mongoose');
const { Schema } = mongoose;
const Location = require('./location');
const Line = require('./line');
const LocationSchema = Location.schema;
const LineSchema = Line.schema;

const BusSchema = new Schema ({
  //id: { type: String },
  location: { type: LocationSchema},
  busNumber: { type: Number, required: true},
  inUse: { type: Boolean},
  //line: { type: LineSchema},
  lineId: { type: String}
});

module.exports = {
  schema: BusSchema,
  model: mongoose.model('Bus', BusSchema)
}

//module.exports = mongoose.model('Bus', BusSchema);
