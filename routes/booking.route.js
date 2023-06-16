// modules
const router = require('express').Router();

// controller
const bookingController = require('../controllers/booking.controller');

// endpoint
router.post('/', bookingController.create);
router.put('/payment/:bookingCode', bookingController.updatePayment);
router.get('/', bookingController.show);

module.exports = router;
