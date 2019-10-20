const mongoose = require('mongoose');
const { Schema } = mongoose;
const StationLine = require('./stationLine');
const Bus = require('./bus');
const Station = require('./station');
const StationLineSchema = StationLine.schema;
const BusSchema = Bus.schema;
const StationSchema = Station.schema;

const LineSchema = new Schema ({
  //id: { type: String },
  lineNumber: { type: Number, required: true},
  name: { type: String, required: true},
  //stations: { type: [StationLineSchema]},
  //stations: { type: [StationSchema]},
  stations: [{ type: Schema.Types.ObjectID, ref: 'Station'}],
  buses: { type: [BusSchema]},
  timetableId: { type: String}
});

module.exports = {
  schema: LineSchema,
  model: mongoose.model('Line', LineSchema)
}

//module.exports = mongoose.model('Line', LineSchema);
