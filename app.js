/* eslint-disable no-console */
require('dotenv').config();

// modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { rateLimit } = require('express-rate-limit');
const cookieparser = require('cookie-parser');
const cron = require('node-cron');

// local
const { notFoundHandler, errorHandler, limiterHandler } = require('./middleware');
const indexRouter = require('./routes');
const { getAllExpBookings, cancelBooking } = require('./utils/services/booking.service');

const app = express();
const { PORT } = process.env;

// middlewares
app.use(rateLimit(limiterHandler));
app.use(
  cors({
    origin: process.env.FE_ORIGIN || 'http://localhost:3000',
    credentials: true,
    // eslint-disable-next-line comma-dangle
  })
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(morgan('dev'));
app.set('view engine', 'ejs');

// router
app.use(indexRouter);

// server error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// cron jobs
cron.schedule('0 * * * *', async () => {
  try {
    // check booking status
    const expiredUnpaidBookings = await getAllExpBookings();

    if (expiredUnpaidBookings.length > 0) {
      // Create an array of promises for cancellation
      const cancellationPromises = expiredUnpaidBookings.map(
        (booking) =>
          // eslint-disable-next-line implicit-arrow-linebreak, comma-dangle
          cancelBooking(booking.booking_code)
        // eslint-disable-next-line function-paren-newline
      );
      // Await all cancellation promises
      await Promise.all(cancellationPromises);
      console.log('some booking has cancelled');
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
});

app.listen(PORT || 8080, '0.0.0.0', () => {
  console.log(`Running on port ${PORT || 8080}`);
});
