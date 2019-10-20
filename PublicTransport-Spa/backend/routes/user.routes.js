const express = require('express');
const router = express.Router();

const user = require('../controllers/user.controller');

router.get('/pricelists', user.getPricelists);
router.get('/ticketsPrices', user.getTicketsPrices);

module.exports = router;
