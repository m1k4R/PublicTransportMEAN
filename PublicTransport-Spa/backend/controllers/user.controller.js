const userController = {};

const Pricelist = require('../models/pricelist');
const Item = require('../models/item');
const PricelistItem = require('../models/pricelistItem');
const UserDiscount = require('../models/userDiscount');
const User = require('../models/user');
const Ticket = require('../models/ticket');
const Paypal = require('../models/paypal');
const bcrypt = require('bcrypt');
const PricelistModel = Pricelist.model;
const ItemModel = Item.model;
const PricelistItemModel = PricelistItem.model;
const UserModel = User.model;
const TicketModel = Ticket.model;

userController.getPricelists = async (req, res) => {
  const pricelist = await PricelistItemModel.find({ "pricelist.active": true });
  console.log(pricelist);
  const regularDiscount = await UserDiscount.find({ type: 'Regular' });
  const studentDiscount = await UserDiscount.find({ type: "Student" });
  const seniorDiscount = await UserDiscount.find({ type: 'Senior' });

  const allPricelists = {
    regularUserPricelist: {
      priceH: Number,
      priceD: Number,
      priceM: Number,
      priceA: Number
    },
    studentPricelist: {
      priceH: Number,
      priceD: Number,
      priceM: Number,
      priceA: Number
    },
    seniorPricelist: {
      priceH: Number,
      priceD: Number,
      priceM: Number,
      priceA: Number
    }
  };

  if (regularDiscount[0].value != 0)
  {
    //console.log(regularDiscount);
    console.log(regularDiscount[0].value);  // [0] = 3h izgubljena
    //console.log(regularDiscount[0].type);
    //console.log(pricelist[0].priceH);
    allPricelists.regularUserPricelist.priceH = pricelist[0].priceH - (pricelist[0].priceH * (regularDiscount[0].value / 100));
    allPricelists.regularUserPricelist.priceD = pricelist[0].priceD - (pricelist[0].priceD * (regularDiscount[0].value / 100));
    allPricelists.regularUserPricelist.priceM = pricelist[0].priceM - (pricelist[0].priceM * (regularDiscount[0].value / 100));
    allPricelists.regularUserPricelist.priceA = pricelist[0].priceA - (pricelist[0].priceA * (regularDiscount[0].value / 100));
    console.log(allPricelists.regularUserPricelist.priceH);
  }
  else
  {
    allPricelists.regularUserPricelist.priceH = pricelist[0].priceH;
    allPricelists.regularUserPricelist.priceD = pricelist[0].priceD;
    allPricelists.regularUserPricelist.priceM = pricelist[0].priceM;
    allPricelists.regularUserPricelist.priceA = pricelist[0].priceA;
    console.log(allPricelists.regularUserPricelist.priceH);
  }

  if (studentDiscount[0].value != 0)
  {
    console.log(studentDiscount[0].value);
    allPricelists.studentPricelist.priceH = pricelist[0].priceH - (pricelist[0].priceH * (studentDiscount[0].value / 100));
    allPricelists.studentPricelist.priceD = pricelist[0].priceD - (pricelist[0].priceD * (studentDiscount[0].value / 100));
    allPricelists.studentPricelist.priceM = pricelist[0].priceM - (pricelist[0].priceM * (studentDiscount[0].value / 100));
    allPricelists.studentPricelist.priceA = pricelist[0].priceA - (pricelist[0].priceA * (studentDiscount[0].value / 100));
    console.log(allPricelists.studentPricelist.priceH);
  }
  else
  {
    allPricelists.studentPricelist.priceH = pricelist[0].priceH;
    allPricelists.studentPricelist.priceD = pricelist[0].priceD;
    allPricelists.studentPricelist.priceM = pricelist[0].priceM;
    allPricelists.studentPricelist.priceA = pricelist[0].priceA;
    console.log(allPricelists.studentPricelist.priceH);
  }

  if (seniorDiscount[0].value != 0)
  {
    console.log(seniorDiscount[0].value);
    allPricelists.seniorPricelist.priceH = pricelist[0].priceH - (pricelist[0].priceH * (seniorDiscount[0].value / 100));
    allPricelists.seniorPricelist.priceD = pricelist[0].priceD - (pricelist[0].priceD * (seniorDiscount[0].value / 100));
    allPricelists.seniorPricelist.priceM = pricelist[0].priceM - (pricelist[0].priceM * (seniorDiscount[0].value / 100));
    allPricelists.seniorPricelist.priceA = pricelist[0].priceA - (pricelist[0].priceA * (seniorDiscount[0].value / 100));
    console.log(allPricelists.seniorPricelist.priceH);
  }
  else
  {
    allPricelists.seniorPricelist.priceH = pricelist[0].priceH;
    allPricelists.seniorPricelist.priceD = pricelist[0].priceD;
    allPricelists.seniorPricelist.priceM = pricelist[0].priceM;
    allPricelists.seniorPricelist.priceA = pricelist[0].priceA;
    console.log(allPricelists.seniorPricelist.priceH);
  }

  console.log(allPricelists);
  res.json(allPricelists);
};

userController.getTicketsPrices = async (req, res) => {
  const pricelist = await PricelistItemModel.find({ "pricelist.active": true });
  //console.log(pricelist);
  //console.log(req.params.userId);

  if (req.params.userId != undefined && req.params.userId != 'none') {
    const user = await UserModel.find({ _id: req.params.userId });
    console.log(user[0].userType);
    const discount = await UserDiscount.find({ type: user[0].userType });

    pricelist[0].priceH = pricelist[0].priceH - (pricelist[0].priceH * (discount[0].value / 100));
    pricelist[0].priceD = pricelist[0].priceD - (pricelist[0].priceD * (discount[0].value / 100));
    pricelist[0].priceM = pricelist[0].priceM - (pricelist[0].priceM * (discount[0].value / 100));
    pricelist[0].priceA = pricelist[0].priceA - (pricelist[0].priceA * (discount[0].value / 100));
    //console.log(pricelist);
  }

  // Treba provjeriti tip ulogovanog korisnika pa na osnovu toga uracunati popust kao u f-ji iznad

  res.json(pricelist);
};

userController.buyTicketUser = async (req, res) => {
  console.log('kupujem kartu');
  const user = await UserModel.find({ _id: req.body.userId });
  console.log(user);
  console.log(user[0].verified);
  //console.log(user.verified);

  if (user[0].verified) {
    console.log('verifikovan');
    const pricelist = await PricelistItemModel.find({ "pricelist.active": true });
    let ts = Date.now();

    let date_ob = new Date(ts);
    /* let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear(); */
    const ticket = new TicketModel({
      dateOfIssue: date_ob,
      ticketType: req.body.ticketType,
      isValid: true,
      user: user[0]._id, // user
      priceInfo: pricelist[0]._id
    });
    const createdTicket = await ticket.save();

    res.json(createdTicket);
  }
  else {
    res.json('User is not verified');
  }
};

userController.buyTicketAnonimus = async (req, res) => {
  const pricelist = await PricelistItemModel.find({ "pricelist.active": true });
  console.log(req.body.ticketType);
  console.log(req.params.ticketType);
  const ticket = new TicketModel({
    dateOfIssue: Date.now(),
    ticketType: req.body.ticketType,
    isValid: true,
    priceInfo: pricelist[0]._id
  });
  const createdTicket = await ticket.save();
  // Send email
  res.json(createdTicket);

};

userController.savePaypalInfo = async (req, res) => {
  console.log('save paypal');
  const newPaypal = new Paypal(req.body);
  const createdPaypal = await newPaypal.save();
  console.log(createdPaypal);
  console.log(createdPaypal._id);

  const { ticketId } = req.params;
  const ticket = {
    paypalInfo: createdPaypal._id // createdPaypal
  };

  await TicketModel.findByIdAndUpdate(ticketId, {$set: ticket});

  res.json({
    'status': 'Paypal Saved'
  });
};

userController.getUser = async (req, res) => {
  const user = await UserModel.findById(req.params.userId);
  res.json(user);
};

userController.getUsers = async (req, res) => {
  const users = await UserModel.find();
  res.json(users);
};

userController.editUser = async (req, res) => {
  const { userId } = req.params;
  let imagePath = req.body.documentUrl;
  if (req.file) {
    let url = req.protocol + '://' + req.get('host');
    imagePath = url + '/images/' + req.file.filename;
  }

  //const hashPass = bcrypt.hash(req.body.password, 10);
  bcrypt.hash(req.body.password, 10)
    .then(async hash => {
      const user = {
        userName: req.body.userName,
        userType: req.body.userType,
        email: req.body.email,
        password: hash,
        name: req.body.name,
        surname: req.body.surname,
        city: req.body.city,
        street: req.body.street,
        number: req.body.number,
        dateOfBirth: req.body.dateOfBirth,
        documentUrl: imagePath,
        accountStatus: req.body.accountStatus,
        publicId: req.body.publicId,
        verified: req.body.verified,
        tickets: req.body.tickets,
        userRole: 'Passenger'
      };
      console.log(userId);
      console.log(user);
      const editedUser = await UserModel.findByIdAndUpdate(userId, {$set: user}, {new: true});
      console.log(editedUser);
      res.json({
        status: 'User Updated'
      });
    });


};

module.exports = userController;
