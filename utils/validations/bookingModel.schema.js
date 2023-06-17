const Joi = require('joi');

const bookingModelSchema = Joi.object({
  booking_code: Joi.string().required().min(9).max(9),
  status: Joi.string().valid('Unpaid', 'Issued', 'Cancelled').optional(),
  payment_status: Joi.boolean().optional(),
  tax: Joi.number().required(),
  total_price: Joi.number().required(),
  exp: Joi.date().required(),
  flight_id: Joi.number().required(),
  user_id: Joi.number().required(),
});

module.exports = bookingModelSchema;
