const mongoose = require('mongoose');
const { Schema } = mongoose;

const PaypalSchema = new Schema ({
  //id: { type: Number },
  cart: { type: String },
  createTime: { type: String },
  paypalId: { type: String },
  email: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  payerId: { type: String },
  paymentMethod: { type: String },
  status: { type: String },
  state: { type: String },
  currency: { type: String },
  total: { type: String }
});

module.exports = mongoose.model('Paypal', PaypalSchema);
