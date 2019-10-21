const express = require('express');
const router = express.Router();

const user = require('../controllers/user.controller');
const checkAuth = require('../middleware/check-auth');

router.get('/pricelists', user.getPricelists);
router.get('/ticketsPrices/:userId', user.getTicketsPrices);
router.put('/buyTicket', user.buyTicketUser);
router.put('/buyTicketUnRegistered', user.buyTicketAnonimus);
router.post('/addPaypal/:ticketId', user.savePaypalInfo);
router.get('/getUser/:userId', user.getUser);
router.get('/getUsers', user.getUsers);
router.put('/editUser/:userId', user.editUser);

module.exports = router;
