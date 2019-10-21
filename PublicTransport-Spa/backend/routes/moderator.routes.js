const express = require('express');
const router = express.Router();

const moderator = require('../controllers/moderator.controller');

router.get('/getTickets', moderator.getTickets);
router.put('/validateTicket/:ticketId', moderator.verificateTicket);
router.put('/verificateUser/:userId', moderator.verificateUser);

module.exports = router;
