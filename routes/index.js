// module
require('dotenv').config();
const router = require('express').Router();

// router
const airportRouter = require('./airport.route');

// airport route
router.use('/airports', airportRouter);

module.exports = router;
