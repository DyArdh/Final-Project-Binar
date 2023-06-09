// module
require('dotenv').config();
const router = require('express').Router();

// router
// const authRouter = require('./auth.route');
const airlinesRouter = require('./airlines.route');

// auth route
// router.use('/auth', authRouter);
router.use('/airlines', airlinesRouter);

module.exports = router;
