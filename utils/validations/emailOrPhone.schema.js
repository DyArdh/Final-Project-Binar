const Joi = require('joi');

const emailOrPhoneValidationSchema = Joi.object({
  emailOrPhone: Joi.string().trim().required().messages({
    'string.base': 'emailOrPhone must be a string',
    'string.empty': 'emailOrPhone cannot be empty',
    'any.required': 'emailOrPhone is required',
  }),
});

module.exports = emailOrPhoneValidationSchema;
