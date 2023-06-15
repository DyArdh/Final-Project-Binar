const router = require('express').Router();

const airlinesController = require('../controllers/airline.controller');

router.get('/', airlinesController.getAirlines);
router.get('/:id', airlinesController.getAirline);

module.exports = router;
