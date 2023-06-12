// module
require('dotenv').config();
const router = require('express').Router();

// router
const airportRouter = require('./airport.route');
const airlinesRouter = require('./airlines.route');
const flightsRouter = require('./flight.route');

// airport route
router.use('/airports', airportRouter);

// airline route
router.use('/airlines', airlinesRouter);

// flight route
router.use('/flights', flightsRouter);

module.exports = router;
