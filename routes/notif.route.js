// modules
const router = require('express').Router();

const notifController = require('../controllers/notif.controller');

router.get('/', notifController.index);
router.put('/:notif_id/read', notifController.update);

module.exports = router;
