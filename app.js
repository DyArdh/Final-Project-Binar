require('dotenv').config();

const express = require('express');

const app = express();
// const morgan = require('morgan');
const { DEV_PORT } = process.env;

// app.use(morgan('dev'));

app.listen(DEV_PORT, () => {
  console.log(`Running at ${DEV_PORT}`);
});
