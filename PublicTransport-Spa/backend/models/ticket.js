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
  user: { type: UserSchema},
  priceInfo: { type: PricelistItemSchema}
});

module.exports = {
  schema: TicketSchema,
  model: mongoose.model('Ticket', TicketSchema)
}

//module.exports = mongoose.model('Ticket', TicketSchema);
