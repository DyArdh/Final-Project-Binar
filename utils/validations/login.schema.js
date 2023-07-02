const Joi = require('joi');

// Schema untuk validasi login
const loginSchema = Joi.object({
  emailOrPhone: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = loginSchema;
