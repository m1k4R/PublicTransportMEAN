const userController = {};

const Pricelist = require('../models/pricelist');
const Item = require('../models/item');
const PricelistItem = require('../models/pricelistItem');
const UserDiscount = require('../models/userDiscount');
const PricelistModel = Pricelist.model;
const ItemModel = Item.model;
const PricelistItemModel = PricelistItem.model;

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
  /* const regularDiscount = await UserDiscount.find({ type: 'Regular' });
  const studentDiscount = await UserDiscount.find({ type: "Student" });
  const seniorDiscount = await UserDiscount.find({ type: 'Senior' }); */

  // Treba provjeriti tip ulogovanog korisnika pa na osnovu toga uracunati popust kao u f-ji iznad

  res.json(pricelist);
};

module.exports = userController;
