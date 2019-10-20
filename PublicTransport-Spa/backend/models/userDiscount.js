const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserDiscountSchema = new Schema ({
  type: { type: String},
  value: { type: Number}
});

module.exports = mongoose.model('UserDiscount', UserDiscountSchema);
