// module
require('dotenv').config();
const router = require('express').Router();

// router
const authRouter = require('./auth.route');
const airportRouter = require('./airport.route');
const airlinesRouter = require('./airline.route');
const flightsRouter = require('./flight.route');
const notifsRouter = require('./notif.route');
const usersRouter = require('./user.route');
const classRouter = require('./class.route');

// middleware
const authMiddleware = require('../middleware/auth.middleware');

// auth route
router.use('/auth', authRouter);

// airport route
router.use('/airports', airportRouter);

// airline route
router.use('/airlines', airlinesRouter);

// flight route
router.use('/flights', flightsRouter);

// class route
router.use('/class', classRouter);

// notif
router.use('/notifications', authMiddleware, notifsRouter);

// user route
router.use('/user', authMiddleware, usersRouter);

module.exports = router;
