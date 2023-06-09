// module
require('dotenv').config();
const router = require('express').Router();

// router
const airportRouter = require('./airport.route');
const airlinesRouter = require('./airlines.route');

// airport route
router.use('/airports', airportRouter);

// airline route
router.use('/airlines', airlinesRouter);

module.exports = router;
