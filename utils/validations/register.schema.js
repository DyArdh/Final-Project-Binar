const Joi = require('joi');

const registerValidationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[0-9]{10,13}$/)
    .required()
    .messages({
      'string.base': 'Phone number must be a string',
      'string.empty': 'Phone number cannot be empty',
      'string.pattern.base': 'Phone number must consist of digits only',
      'string.length': 'Phone number must be between {#limit} characters long',
      'any.required': 'Phone number is required',
    }),
  password: Joi.string()
    .min(8)
    .required()
    .pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/)
    .messages({
      'string.base': 'Password must be a string',
      'string.empty': 'Password cannot be empty',
      'string.min': 'Password must be at least {#limit} characters long',
      'string.pattern.base': 'Password must contain at least one uppercase letter and one digit',
      'any.required': 'Password is required',
    }),
});

module.exports = registerValidationSchema;
