const router = require('express').Router();

const classController = require('../controllers/class.controller');

router.get('/', classController.getAllClass);

module.exports = router;
