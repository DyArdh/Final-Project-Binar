const Joi = require('joi');

const userUpdateValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'name must be a string',
    'any.required': 'name is required',
  }),
});

module.exports = userUpdateValidationSchema;
