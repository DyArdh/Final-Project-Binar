const Joi = require('joi');

const resetPasswordValidationSchema = Joi.object({
  password: Joi.string()
    .min(8)
    .required()
    .pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/)
    .messages({
      'string.base': 'password must be a string',
      'string.empty': 'password cannot be empty',
      'string.min': 'password must be at least {#limit} characters long',
      'string.pattern.base': 'password must contain at least one uppercase letter and one digit',
      'any.required': 'password is required',
    }),
  confirm_password: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'passwords do not match',
    'any.required': 'confirm_password is required',
  }),
});

module.exports = resetPasswordValidationSchema;
