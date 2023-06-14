// modules
const router = require('express').Router();

const userController = require('../controllers/user.controller');

// endpoint
router.get('/whoami', userController.whoami);
router.put('/:id', userController.update);

module.exports = router;
