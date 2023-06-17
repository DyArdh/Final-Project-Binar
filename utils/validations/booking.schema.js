const Joi = require('joi');

const passengerObjSchema = Joi.object({
  name: Joi.string().optional(),
  surname: Joi.string().optional(),
  gender: Joi.boolean().optional(),
  valid_until: Joi.date().optional(),
  country_publication: Joi.string().optional(),
  ktp_passport: Joi.string().optional(),
  citizenship: Joi.string().optional(),
  bod: Joi.string().optional(),
  passenger_type: Joi.string().valid('adult', 'kid', 'baby').required(),
});

const informationBookingSchema = Joi.object({
  tax: Joi.number().required(),
  total_price: Joi.number().required(),
  flight_id: Joi.number().required(),
});

const bookingSchema = Joi.object({
  passengers: Joi.array().items(passengerObjSchema).required(),
  information: informationBookingSchema.required(),
});

module.exports = bookingSchema;
