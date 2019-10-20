const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema ({
  //id: Number,
  street: { type: String, required: true},
  city: { type: String, required: true},
  number: { type: String, required: true}
});

module.exports = {
  schema: AddressSchema,
  model: mongoose.model('Address', AddressSchema)
}

//module.exports = mongoose.model('Address', AddressSchema);
