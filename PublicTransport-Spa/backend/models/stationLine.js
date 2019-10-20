const mongoose = require('mongoose');
const { Schema } = mongoose;
const Station = require('./station');
const Line = require('./line');
const LineSchema = Line.schema;
const StationSchema = Station.schema;

const StationLineSchema = new Schema ({
  lineId: { type: String },
  stationId: { type: String },
  //line: { type: LineSchema},
  //station: { type: StationSchema}
});

module.exports = {
  schema: StationLineSchema,
  model: mongoose.model('StationLine', StationLineSchema)
}

//module.exports = mongoose.model('StationLine', StationLineSchema);
