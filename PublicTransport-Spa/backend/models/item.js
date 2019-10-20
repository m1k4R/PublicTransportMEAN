const mongoose = require('mongoose');
const { Schema } = mongoose;

const ItemSchema = new Schema ({
  //id: { type: Number },
  typeH: { type: String},
  typeD: { type: String},
  typeM: { type: String},
  typeA: { type: String}
  //description: { type: String}
});

module.exports = {
  schema: ItemSchema,
  model: mongoose.model('Item', ItemSchema)
}

//module.exports = mongoose.model('Item', ItemSchema);
