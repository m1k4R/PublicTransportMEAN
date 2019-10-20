const mongoose = require('mongoose');
const { Schema } = mongoose;
const Address = require('./address');
const Ticket = require('./ticket');
const TicketSchema = Ticket.schema;

const UserSchema = new Schema ({
  name: { type: String },
  surname: { type: String },
  dateOfBirth: { type: Date },
  address: { type: Address },
  userType: { type: String },
  accountStatus: { type: String },
  documentUrl: { type: String },
  publicId: { type: String },
  verified: { type: Boolean },
  tickets: { type: [TicketSchema] },
  //userRoles: { type: [UserRole] }
});

module.exports = {
  schema: UserSchema,
  model: mongoose.model('User', UserSchema)
}

//module.exports = mongoose.model('User', UserSchema);
