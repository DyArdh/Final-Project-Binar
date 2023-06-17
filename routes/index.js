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
const bookingRouter = require('./booking.route');
const classRouter = require('./class.route');

// middleware
const authMiddleware = require('../middleware/auth.middleware');

// index
// eslint-disable-next-line arrow-body-style
router.get('/', (req, res) => {
  return res.status(200).json({
    status: true,
    message: 'welcome to skypass api!',
    data: null,
  });
});

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

// booking
router.use('/booking', authMiddleware, bookingRouter);

module.exports = router;
