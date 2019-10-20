const adminController = {};

const Line = require('../models/line');
const Bus = require('../models/bus');
const Station = require('../models/station');
const Pricelist = require('../models/pricelist');
const Item = require('../models/item');
const PricelistItem = require('../models/pricelistItem');
const UserDiscount = require('../models/userDiscount');
const Timetable = require('../models/timeTable');
const LineModel = Line.model;
const BusModel = Bus.model;
const StationModel = Station.model;
const PricelistModel = Pricelist.model;
const ItemModel = Item.model;
const PricelistItemModel = PricelistItem.model;

// Line

adminController.createLine = async (req, res) => {
  const newLine = new LineModel(req.body);
  const createdLine = await newLine.save();
  /* if (req.body.buses != null && req.body.buses != undefined)
  {
      req.body.buses.forEach(bus => {
      bus.inUse = true;
      BusModel.findByIdAndUpdate(bus._id, {$set: bus});
    });
  } */

  /* const line = {
    id: createdLine._id,
    lineNumber: createdLine.lineNumber,
    name: createdLine.name,
    stations: createdLine.stations,
    buses: createdLine.buses,
    timetableId: createdLine.timetableId
  };

  await LineModel.findByIdAndUpdate(createdLine._id, {$set: line}, {new: true});
 */
  res.json({
    'status': 'Line Saved'
  });
  //res.json(createdLine);
};

adminController.getLine = async (req, res) => {
  //console.log('BAD');
  const line = await LineModel.findById(req.params.lineId).populate('stations');
  res.json(line);
};

adminController.getLines = async (req, res) => {
  //console.log('All Lines OK');
  const lines = await LineModel.find().populate('stations');
  res.json(lines);

};

adminController.removeLine = async (req, res) => {
  const line = await LineModel.findById(req.params.lineId).populate('stations');
  if (line.buses != null && line.buses != undefined)
  {
    line.buses.forEach(bus => {
      bus.inUse = false;
      BusModel.findByIdAndUpdate(bus._id, {$set: bus});
    });
  }

  await LineModel.findByIdAndRemove(req.params.lineId);
  res.json({ status: 'Line Removed' });
};

adminController.editLine = async (req, res) => {
  const { lineId } = req.params;
  const line = {
    lineNumber: req.body.lineNumber,
    name: req.body.name,
    stations: req.body.stations,
    buses: req.body.buses,
    timetableId: req.body.timetableId
  };

  /* if (line.buses != null && line.buses != undefined)
  {
      line.buses.forEach(bus => {
      bus.inUse = true;
      BusModel.findByIdAndUpdate(bus._id, {$set: bus});
    });
  } */
  /* line.buses.forEach(bus => {
    bus.inUse = true;
  }); */

  await LineModel.findByIdAndUpdate(lineId, {$set: line}, {new: true});
  /* if (req.body.buses != null && req.body.buses != undefined)
  {
    req.body.buses.forEach(bus => {
      //bus.inUse = true;
      console.log(bus._id + '  ' + bus);
      //const upd = BusModel.findByIdAndUpdate(bus._id, {$set: bus});
      console.log(bus.inUse);
    });
  } */

  res.json({
    status: 'Line Updated'
  });
};

// Bus

adminController.createBus = async (req, res) => {
  const newBus = new BusModel(req.body);
  const createdBus = await newBus.save();

  res.json({
    'status': 'Bus Saved'
  });
};

adminController.getBusses = async (req, res) => {
  const busses = await BusModel.find({inUse: {$ne: true}});
  /* busses.forEach(element => {
    console.log(element.inUse);
  }); */
  res.json(busses);
};

adminController.busInUse = async (req, res) => {
  const { busId } = req.params;
  const bus = {
    location: req.body.location,
    busNumber: req.body.busNumber,
    inUse: req.body.inUse,
    lineId: req.body.lineId
  };

  await BusModel.findByIdAndUpdate(busId, {$set: bus});

  res.json({
    status: 'Bus in use changed'
  });
};

/* adminController.busNotInUse = async (req, res) => {
  console.log('Bus not in use');
  const { busId } = req.params;
  const bus = {
    location: req.body.location,
    busNumber: req.body.busNumber,
    inUse: req.body.inUse,
    lineId: req.body.lineId
  };

  await BusModel.findByIdAndUpdate(busId, {$set: bus});

  res.json({
    status: 'Bus not in use'
  });
}; */

// Station

adminController.createStation = async (req, res) => {
  //console.log(req.body);
  const newStation = new StationModel(req.body);
  const createdStation = await newStation.save();
  //console.log(createdStation);
  /* const station = {
    address: {
      city: req.body.city,
      street: req.body.street,
      number: req.body.number
    },
    location: {
      x: req.body.x,
      y: req.body.y
    }
  };

  await StationModel.findByIdAndUpdate(createdStation._id, {$set: station}, {new: true}); */


  /* newStation.address.city = req.body.city;
  newStation.address.street = req.body.street;
  newStation.address.number = req.body.number;
  newStation.location.x = req.body.x;
  newStation.location.y = req.body.y; */


  res.json({
    'status': 'Station Saved'
  });
};

adminController.getStation = async (req, res) => {
  const station = await StationModel.findById(req.params.stationId).populate('lines');
  res.json(station);
};

adminController.getStations = async (req, res) => {
  const stations = await StationModel.find().populate('lines');
  //console.log(stations);
  res.json(stations);

};

adminController.removeStation = async (req, res) => {
  await StationModel.findByIdAndRemove(req.params.stationId);
  res.json({ status: 'Station Removed' });
};

adminController.editStation = async (req, res) => {
  const { stationId } = req.params;
  const station = {
    name: req.body.name,
    address: req.body.address,
    location: req.body.location,
    lines: req.body.lines
  };

  await StationModel.findByIdAndUpdate(stationId, {$set: station}, {new: true});
  res.json({
    status: 'Station Updated'
  });
};

// Pricelist

adminController.createPricelist = async (req, res) => {

  const pricelist = new PricelistItemModel(req.body);

  if (req.body.pricelist.active) {
    //console.log('ostale na false');
    const pricelists = await PricelistItemModel.find();

    pricelists.forEach(element => {
      element.pricelist.active = false;
      adminController.pricelistActiveFalse(element);
    });
  }

  const createdPricelist = await pricelist.save();



  /* console.log(req.body);

  console.log('Kreiramoo Pricelist');
  const pricelist = new PricelistModel(req.body);
  const createdPricelist = await pricelist.save();
  console.log(createdPricelist);

  //Create Items for 4 types of ticket
  const hourItem = new ItemModel({ type: 'Hourly' });
  const createdHourItem = await hourItem.save();
  const dayItem = new ItemModel({ type: 'Daily' });
  const createdDayItem = await dayItem.save();
  const monthItem = new ItemModel({ type: 'Monthly' });
  const createdMonthItem = await monthItem.save();
  const annualItem = new ItemModel({ type: 'Annual' });
  const createdAnnualItem = await annualItem.save();

  //Create PricelistItems
  const priceHourly = new PricelistItemModel({
    pricelist: createdPricelist,
    item: createdHourItem,
    price: req.body.priceHourly
  });
  const createdPriceHourly = await priceHourly.save();
  const priceDaily = new PricelistItemModel({
    pricelist: createdPricelist,
    item: createdDayItem,
    price: req.body.priceDaily
  });
  const createdPriceDaily = await priceDaily.save();
  const priceMonthly = new PricelistItemModel({
    pricelist: createdPricelist,
    item: createdMonthItem,
    price: req.body.priceMonthly
  });
  const createdPriceMonthly = await priceMonthly.save();
  const priceAnnual = new PricelistItemModel({
    pricelist: createdPricelist,
    item: createdAnnualItem,
    price: req.body.priceAnnual
  });
  const createdPriceAnnual = await priceAnnual.save();
  console.log('Kraj');
  console.log(createdPriceAnnual); */

  /* const line = {
    id: createdLine._id,
    lineNumber: createdLine.lineNumber,
    name: createdLine.name,
    stations: createdLine.stations,
    buses: createdLine.buses,
    timetableId: createdLine.timetableId
  };

  await LineModel.findByIdAndUpdate(createdLine._id, {$set: line}, {new: true});
 */
  res.json({
    'status': 'Pricelist Saved'
  });
  //res.json(createdLine);
};

adminController.getPricelist = async (req, res) => {
  //console.log('BAD');
  const pricelist = await PricelistItemModel.findById(req.params.pricelistId);
  res.json(pricelist);
};

adminController.getPricelists = async (req, res) => {
  //console.log('All Lines OK');
  const pricelists = await PricelistItemModel.find();
  res.json(pricelists);

};

adminController.removePricelist = async (req, res) => {
  await PricelistItemModel.findByIdAndRemove(req.params.pricelistId);
  res.json({ status: 'Pricelist Removed' });
};

adminController.editPricelist = async (req, res) => {
  const { pricelistId } = req.params;
  const pricelist = {
    item: req.body.item,
    pricelist: req.body.pricelist,
    priceH: req.body.priceH,
    priceD: req.body.priceD,
    priceM: req.body.priceM,
    priceA: req.body.priceA
  };

  if (req.body.pricelist.active) {
    const pricelists = await PricelistItemModel.find();

    pricelists.forEach(element => {
      element.pricelist.active = false;
      adminController.pricelistActiveFalse(element);
    });
  }

  await PricelistItemModel.findByIdAndUpdate(pricelistId, {$set: pricelist}, {new: true});
  res.json({
    status: 'Pricelist Updated'
  });
};

adminController.pricelistActiveFalse = async (req) => {
  //console.log(req);
  const pricelistId = req._id;
  const pricelist = {
    item: req.item,
    pricelist: req.pricelist,
    priceH: req.priceH,
    priceD: req.priceD,
    priceM: req.priceM,
    priceA: req.priceA
  };
  //console.log(pricelist);
  await PricelistItemModel.findByIdAndUpdate(pricelistId, {$set: pricelist}, {new: true});
};

// UserDiscount

adminController.getUserDiscount = async (req, res) => {
  //console.log('BAD');
  const userDiscount = await UserDiscount.find({ type: req.params.discType });
  res.json(userDiscount);
};

adminController.updateUserDiscount = async (req, res) => {
  const { discType } = req.params;
  const userDiscount = {
    value: req.body.value,
    type: req.body.type
  };
  console.log(req.body);

  const newUserDiscount = new UserDiscount(req.body);

  const userDiscountExist = await UserDiscount.find({ type: discType });

  if (userDiscountExist != [])
  {
    console.log('postoji');
    console.log(userDiscountExist);
    await UserDiscount.findOneAndUpdate({ type: discType }, {$set: userDiscount});
  }
  else
  {
    console.log('novi pravi');
    await newUserDiscount.save();
  }


  res.json({
    status: 'UserDiscount Updated'
  });
};

// Timetable

adminController.createTimetable = async (req, res) => {
  const newTimetable = new Timetable(req.body);
  const createdTimetable = await newTimetable.save();

  res.json({
    'status': 'Timetable Saved'
  });
};

adminController.getTimetable = async (req, res) => {
  const timetable = await Timetable.findById(req.params.timetableId).populate({
    path: 'line',
    populate: { path: 'stations' }
  });
  res.json(timetable);
};

adminController.getTimetables = async (req, res) => {
  const timetables = await Timetable.find().populate({
    path: 'line',
    populate: { path: 'stations' }
  });
  res.json(timetables);

};

adminController.removeTimetable = async (req, res) => {
  await Timetable.findByIdAndRemove(req.params.timetableId);
  res.json({ status: 'Timetable Removed' });
};

adminController.editTimetable = async (req, res) => {
  const { timetableId } = req.params;
  const timetable = {
    type: req.body.type,
    day: req.body.day,
    line: req.body.line,
    departures: req.body.departures
  };

  await Timetable.findByIdAndUpdate(timetableId, {$set: timetable}, {new: true});
  res.json({
    status: 'Timetable Updated'
  });
};


module.exports = adminController;
