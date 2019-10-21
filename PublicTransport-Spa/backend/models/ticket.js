const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./user');
const PricelistItem = require('./pricelistItem');
const UserSchema = User.schema;
const PricelistItemSchema = PricelistItem.schema;

const TicketSchema = new Schema ({
  //id: { type: Number },
  dateOfIssue: { type: Date},
  ticketType: { type: String},
  isValid: { type: Boolean},
  user: { type: Schema.Types.ObjectID, ref: 'User'},
  priceInfo: { type: Schema.Types.ObjectID, ref: 'PricelistItem'},
  paypalInfo: { type: Schema.Types.ObjectID, ref: 'Paypal'},
});

module.exports = {
  schema: TicketSchema,
  model: mongoose.model('Ticket', TicketSchema)
}

//module.exports = mongoose.model('Ticket', TicketSchema);
