const router = require('express').Router();

const flightController = require('../controllers/flight.controller');

router.post('/oneway', flightController.getFlightByFilter);

module.exports = router;
