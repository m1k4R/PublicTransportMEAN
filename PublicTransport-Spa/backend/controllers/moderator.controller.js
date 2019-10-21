const moderatorController = {};

const Ticket = require('../models/ticket');
const User = require('../models/user');
const TicketModel = Ticket.model;
const UserModel = User.model;

moderatorController.getTickets = async (req, res) => {
  const tickets = await TicketModel.find().populate('user').populate('paypalInfo').populate('priceInfo');
  res.json(tickets);
};

moderatorController.verificateTicket = async (req, res) => {
  console.log(req.params.ticketId);
  const ticket = await TicketModel.findById(req.params.ticketId);
  console.log(ticket);

  const verifyTicket = ticket;

  let ts = Date.now();
  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();

  if (ticket.ticketType == "Daily") {
    if (date_ob.getDate() < ticket.dateOfIssue.getDate() + 1) {
      verifyTicket.isValid = true;
    }
    else {
      verifyTicket.isValid = false;
    }
  }
  else if (ticket.ticketType == "Hourly") {
    console.log(date_ob.getDate());
    console.log(ticket.dateOfIssue.getDate());
    if (date_ob.getDate() == ticket.dateOfIssue.getDate()) {
      console.log(date_ob.getHours());
      console.log(ticket.dateOfIssue.getHours());

      if (date_ob.getHours() < ticket.dateOfIssue.getHours() + 1) {
        verifyTicket.isValid = true;
        console.log('nije istekla');
      }
      else {
        verifyTicket.isValid = false;
        console.log('istekla');
      }
    }
    else {
      verifyTicket.isValid = false;
    }
  }
  else if (ticket.ticketType == "Monthly") {
    if (date_ob.getMonth() < ticket.dateOfIssue.getMonth() + 1) {
      verifyTicket.isValid = true;
    }
    else {
      verifyTicket.isValid = false;
    }
  }
  else if (ticket.ticketType == "Annual") {
    if (date_ob.getFullYear() < ticket.dateOfIssue.getFullYear() + 1) {
      verifyTicket.isValid = true;
    }
    else {
      verifyTicket.isValid = false;
    }
  }
  //console.log(verifyTicket);
  const verificatedTicket = await TicketModel.findByIdAndUpdate(req.params.ticketId, {$set: verifyTicket});
  //console.log(verificatedTicket);
  res.json(verificatedTicket);
};

moderatorController.verificateUser = async (req, res) => {
  console.log(req.params.userId);
  console.log(req.body.valid);
  const user = await UserModel.findById(req.params.userId);
  //const user = await UserModel.find({ _id: req.body.userId });
  console.log(user);
  console.log(user.name);
  const userToVerificate = user;
  if (req.body.valid) {
    userToVerificate.accountStatus = 'Active';
    userToVerificate.verified = true;
    const userActive = await UserModel.findByIdAndUpdate(req.params.userId, {$set: userToVerificate});
    console.log(userActive);
    res.json({
      status: 'Active User'
    });
  }
  else {
    userToVerificate.accountStatus = 'Rejected';
    userToVerificate.verified = false;
    const userRejected = await UserModel.findByIdAndUpdate(req.params.userId, {$set: userToVerificate});
    console.log(userRejected);
    res.json({
      status: 'Rejected User'
    });
  }


};

module.exports = moderatorController;
