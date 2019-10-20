const mongoose = require('mongoose');
const { Schema } = mongoose;

const LocationSchema = new Schema ({
  //id: { type: Number },
  x: { type: Number, required: true},
  y: { type: Number, required: true}
});

module.exports = {
  schema: LocationSchema,
  model: mongoose.model('Location', LocationSchema)
}

//module.exports = mongoose.model('Location', LocationSchema);
