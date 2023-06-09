const router = require('express').Router();

const airlinesController = require('../controllers/airlines.controller');

router.get('/', airlinesController.getAirlines);
router.get('/:id', airlinesController.getAirline);

module.exports = router;
