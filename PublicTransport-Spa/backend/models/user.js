const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');
const Address = require('./address');
const Ticket = require('./ticket');
const TicketSchema = Ticket.schema;

const UserSchema = new Schema ({
  userName: { type: String },
  userType: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String },
  surname: { type: String },
  city: { type: String },
  street: { type: String },
  number: { type: String },
  dateOfBirth: { type: Date },
  documentUrl: { type: String },
  accountStatus: { type: String },
  publicId: { type: String },
  verified: { type: Boolean },
  tickets: { type: [TicketSchema] },
  userRole: { type: String }
  /* name: { type: String },
  surname: { type: String },
  dateOfBirth: { type: Date },
  address: { type: Address },
  userType: { type: String },
  accountStatus: { type: String },
  documentUrl: { type: String },
  publicId: { type: String },
  verified: { type: Boolean },
  tickets: { type: [TicketSchema] }, */
  //userRoles: { type: [UserRole] }
});

UserSchema.plugin(uniqueValidator); //we will get an error if we try to save user with the email that already exist

module.exports = {
  schema: UserSchema,
  model: mongoose.model('User', UserSchema)
}

//module.exports = mongoose.model('User', UserSchema);
