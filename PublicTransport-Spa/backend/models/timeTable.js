const mongoose = require('mongoose');
const { Schema } = mongoose;
const Line = require('./line');
const LineSchema = Line.schema;

const TimeTableSchema = new Schema ({
  //id: { type: Number },
  type: { type: String, required: true},
  day: { type: String, required: true},
  line: { type: Schema.Types.ObjectID, ref: 'Line'},
  departures: { type: String},
  //lineId: { type: String}
});

module.exports = mongoose.model('Timetable', TimeTableSchema);
