const router = require('express').Router();

const flightController = require('../controllers/flight.controller');

router.get('/', flightController.getFlights);

module.exports = router;
