const router = require('express').Router();

const flightController = require('../controllers/flight.controller');

router.post('/oneway', flightController.getFlightByFilter);
router.get('/oneway/:id', flightController.getFlightById);

module.exports = router;
