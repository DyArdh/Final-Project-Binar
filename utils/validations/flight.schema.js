const Joi = require('joi');

const flightSchema = Joi.object({
  from: Joi.string().min(3).max(3).required(),
  to: Joi.string().min(3).max(3).required(),
  departure: Joi.string().required(),
  totalPassenger: Joi.number().required(),
  classId: Joi.number().required(),
});

module.exports = flightSchema;
