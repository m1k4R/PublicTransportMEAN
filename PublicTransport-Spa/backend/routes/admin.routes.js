const express = require('express');
const router = express.Router();

const admin = require('../controllers/admin.controller');
const checkAuth = require('../middleware/check-auth');  // path, checkAuth, function

router.post('/addLine', admin.createLine);  // '/' + /addLine ili /addLine/
router.get('/getLine/:lineId', admin.getLine);   // getLine?lineId= je u angularu vrv treba promjeniti
router.get('/getLines', admin.getLines);
router.get('/getAllLines', admin.getAllLines);
router.put('/updateLine/:lineId', admin.editLine);
router.delete('/removeLine/:lineId', admin.removeLine);

router.post('/addBus', admin.createBus);
router.get('/getBusses', admin.getBusses);
router.put('/busInUse/:busId', admin.busInUse);
//router.put('/busNotInUse/:busId', admin.busNotInUse);

router.post('/addStation', admin.createStation);
router.get('/getStation/:stationId', admin.getStation);
router.get('/getStations', admin.getStations);
router.get('/getAllStations', admin.getAllStations);
router.put('/updateStation/:stationId', admin.editStation);
router.delete('/removeStation/:stationId', admin.removeStation);

router.post('/addPricelist', admin.createPricelist);
router.get('/getPricelist/:pricelistId', admin.getPricelist);
router.get('/getAllPricelists', admin.getPricelists);
router.put('/updatePricelist/:pricelistId', admin.editPricelist);
router.delete('/removePricelist/:pricelistId', admin.removePricelist);

router.get('/getUserDiscount/:discType', admin.getUserDiscount);
router.put('/updateUserDiscount/:discType', admin.updateUserDiscount);

router.post('/addTimetable', admin.createTimetable);
router.get('/getTimetable/:timetableId', admin.getTimetable);
router.get('/getTimetables', admin.getTimetables);
router.get('/getAllTimetables', admin.getAllTimetables);
router.put('/updateTimetable/:timetableId', admin.editTimetable);
router.delete('/removeTimetable/:timetableId', admin.removeTimetable);

module.exports = router;
