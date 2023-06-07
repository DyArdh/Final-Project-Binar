require('dotenv').config();

// modules
const express = require('express');
const morgan = require('morgan');

const app = express();
const { DEV_PORT } = process.env;

app.use(morgan('dev'));

app.listen(DEV_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Running at ${DEV_PORT}`);
});
