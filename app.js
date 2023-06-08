require('dotenv').config();

// modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { rateLimit } = require('express-rate-limit');

// local
const { notFoundHandler, errorHandler, limiterHandler } = require('./middleware');
const indexRouter = require('./routes');

const app = express();
const { DEV_PORT } = process.env;

// middlewares
app.use(rateLimit(limiterHandler));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

// router
app.use(indexRouter);

// server error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(DEV_PORT || 8000, () => {
  // eslint-disable-next-line no-console
  console.log(`Running at ${DEV_PORT || 8000}`);
});
