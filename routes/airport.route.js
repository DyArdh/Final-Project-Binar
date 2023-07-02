// modules
const router = require('express').Router();

// controller
const airportController = require('../controllers/airport.controller');

// endpoint
router.get('/', airportController.index);

module.exports = router;
