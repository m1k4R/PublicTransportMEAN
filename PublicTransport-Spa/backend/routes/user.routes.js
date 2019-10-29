const express = require('express');
const multer = require('multer');
const router = express.Router();

const user = require('../controllers/user.controller');
const checkAuth = require('../middleware/check-auth');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file.originalname);
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    if (isValid) {
      error = null;
    }
    cb(error, 'backend/images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.get('/pricelists', user.getPricelists);
router.get('/ticketsPrices/:userId', user.getTicketsPrices);
router.put('/buyTicket', user.buyTicketUser);
router.put('/buyTicketUnRegistered', user.buyTicketAnonimus);
router.post('/addPaypal/:ticketId', user.savePaypalInfo);
router.get('/getUser/:userId', user.getUser);
router.get('/getUsers', user.getUsers);
router.put('/editUser/:userId', multer({storage: storage}).single('image'), user.editUser);

module.exports = router;
