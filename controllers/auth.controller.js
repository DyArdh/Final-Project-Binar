/* eslint-disable object-curly-newline */
const bcrypt = require('bcrypt');

// validation
const registerValidationSchema = require('../utils/validations/register.schema');
const otpValidationSchema = require('../utils/validations/otp.schema');
const loginSchema = require('../utils/validations/login.schema');
const emailOrPhoneSchema = require('../utils/validations/emailOrPhone.schema');
const resetPasswordSchema = require('../utils/validations/resetPassword.schema');

// lib
const { generateOTP } = require('../utils/lib/otp.lib');
const { generateToken, verifyToken } = require('../utils/lib/jwt.lib');
const nodemailerLib = require('../utils/lib/nodemailer.lib');

// service
const {
  createUser,
  getUserByEmailOrPhone,
  getUserByEmailAndPhone,
  updateUserByEmail,
  getUserByEmail,
  getResetToken,
  createResetToken,
  updateResetTokenExp,
} = require('../utils/services/user.service');

// environments
const { REFRESH_SECRET_KEY } = process.env;

module.exports = {
  register: async (req, res, next) => {
    try {
      const otp = generateOTP();
      const { error, value } = registerValidationSchema.validate(req.body);

      // check if error
      if (error) {
        return res.status(400).json({
          status: false,
          message: error.details[0].message,
          data: null,
        });
      }

      // Use the validated data (value) for further processing
      const { name, email, phone, password } = value;

      // check user with email is register or not
      const exist = await getUserByEmailAndPhone(email, phone);

      if (exist) {
        return res.status(409).json({
          status: false,
          message: 'user already exist!',
          data: null,
        });
      }

      // hash password
      const hashPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));

      // gen exp
      const expiredDate = new Date(Date.now() + 10 * 60000);

      // store to db
      const userData = {
        name,
        email,
        otp,
        phone,
        password: hashPassword,
        is_active: false,
        is_google: false,
        activation_exp: expiredDate,
        role: 'user',
      };

      await createUser(userData);

      // send email otp to client
      const htmlOtp = await nodemailerLib.getHtml('otp-message.ejs', {
        user: { otp },
      });
      nodemailerLib.sendEmail(email, 'OTP Verification', htmlOtp);

      // create token for verified otp (10 minutes)
      const verifiedToken = generateToken({ email }, '10m');

      // the token is sent directly to the client
      return res.status(201).json({
        status: true,
        message: 'user created!',
        data: {
          verifiedToken,
        },
      });
    } catch (error) {
      next(error);
    }
    return null;
  },

  login: async (req, res, next) => {
    try {
      const { error, value } = loginSchema.validate(req.body);

      // check if error
      if (error) {
        return res.status(400).json({
          status: false,
          message: error.details[0].message,
          data: null,
        });
      }

      // Use the validated data (value) for further processing
      const { emailOrPhone, password } = value;

      // find user
      const user = await getUserByEmailOrPhone(emailOrPhone);

      // if not found
      if (!user) {
        return res.status(404).json({
          status: false,
          message: 'credential not found!',
          data: null,
        });
      }

      // verified password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({
          status: false,
          message: 'credential not valid!',
          data: null,
        });
      }

      // verified isActive
      if (!user.is_active) {
        // gen exp
        const expiredDate = new Date(Date.now() + 10 * 60000);
        // create token for verified otp (10 minutes)
        const verifiedToken = generateToken({ email: user.email }, '10m');

        // update user
        await updateUserByEmail(user.email, { activation_exp: expiredDate });

        // the token is sent directly to the client
        return res.status(403).json({
          status: false,
          message: 'Please verified your account first!',
          data: {
            verifiedToken,
          },
        });
      }

      // if isActive true
      // gen refresh token and access token
      const accessToken = generateToken({ id: user.id, email: user.email, name: user.name }, '1h'); // change access token to 1 hour
      const refreshToken = generateToken(
        { id: user.id, email: user.email, name: user.name },
        '1d',
        // eslint-disable-next-line comma-dangle
        REFRESH_SECRET_KEY
      );

      // the token is sent directly to the client
      return res.status(200).json({
        status: true,
        message: 'success!',
        data: {
          access_token: accessToken,
          refres_token: refreshToken,
        },
      });
    } catch (error) {
      next(error);
    }
    return null;
  },

  resendOTP: async (req, res, next) => {
    try {
      const { token } = req.query;

      if (!token) {
        return res.status(406).json({
          status: false,
          message: 'Unauthorized!',
          data: null,
        });
      }

      // verify token
      const decodedToken = verifyToken(token);

      if (decodedToken.error) {
        return res.status(406).json({
          status: false,
          message: 'Unauthorized!',
          data: null,
        });
      }

      // find user
      const user = await getUserByEmail(decodedToken.email);

      // if user already active
      if (user.is_active) {
        return res.status(401).json({
          status: false,
          message: 'Unauthorized!',
          data: null,
        });
      }

      // gen otp and update exp
      const otp = generateOTP();
      const expiredDate = new Date(Date.now() + 10 * 60000);

      await updateUserByEmail(user.email, { otp, activation_exp: expiredDate });

      // send email otp to client
      const htmlOtp = await nodemailerLib.getHtml('otp-message.ejs', {
        user: { otp },
      });
      nodemailerLib.sendEmail(user.email, 'OTP Verification', htmlOtp);

      // create token for verified otp (10 minutes)
      const updateVerifiedToken = generateToken({ email: user.email }, '10m');

      // the token is sent directly to the client
      return res.status(200).json({
        status: true,
        message: 'success!',
        data: {
          verifiedToken: updateVerifiedToken,
        },
      });
    } catch (error) {
      next(error);
    }
    return null;
  },

  verifiedOTP: async (req, res, next) => {
    try {
      const { verifiedToken } = req.body;

      if (!verifiedToken) {
        return res.status(406).json({
          status: false,
          message: 'Unauthorized!',
          data: null,
        });
      }

      // verify token
      const decodedToken = verifyToken(verifiedToken);

      if (decodedToken.error) {
        return res.status(406).json({
          status: false,
          message: 'Unauthorized!',
          data: null,
        });
      }

      const { error, value } = otpValidationSchema.validate(req.body);

      // check if input error
      if (error) {
        return res.status(400).json({
          status: false,
          message: error.details[0].message,
          data: null,
        });
      }

      // find user
      const user = await getUserByEmail(decodedToken.email);

      if (user.is_active) {
        return res.status(401).json({
          status: false,
          message: 'Unauthorized!',
          data: null,
        });
      }

      // Use the validated data (value) for further processing
      const { otp } = value;

      // validate user otp
      if (otp !== user.otp) {
        return res.status(400).json({
          status: false,
          message: 'wrong otp code!',
          data: null,
        });
      }

      // update is_active
      await updateUserByEmail(user.email, { is_active: true });

      // send email
      const htmlWelcome = await nodemailerLib.getHtml('welcome-message.ejs', {});
      nodemailerLib.sendEmail(user.email, 'Welcome to SkyPass!', htmlWelcome);

      return res.status(200).json({
        status: true,
        message: 'success!',
        data: null,
      });
    } catch (error) {
      next(error);
    }
    return null;
  },

  refreshToken: async (req, res, next) => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(406).json({
          status: false,
          message: 'Unauthorized!',
          data: null,
        });
      }

      // verify token
      const decodedToken = verifyToken(refreshToken, REFRESH_SECRET_KEY);

      if (decodedToken.error) {
        return res.status(406).json({
          status: false,
          message: 'Unauthorized!',
          data: null,
        });
      }

      // get user
      const user = await getUserByEmailOrPhone(decodedToken.email);

      // generate new access token
      const accessToken = generateToken({ id: user.id, email: decodedToken.email }, '10m');

      return res.status(200).json({
        status: true,
        message: 'success!',
        data: {
          access_token: accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
    return null;
  },

  resetPasswordRequest: async (req, res, next) => {
    try {
      const { error, value } = emailOrPhoneSchema.validate(req.body);

      // check if error
      if (error) {
        return res.status(400).json({
          status: false,
          message: error.details[0].message,
          data: null,
        });
      }

      // Use the validated data (value) for further processing
      const { emailOrPhone } = value;

      // find user
      const user = await getUserByEmailOrPhone(emailOrPhone);

      // if not found
      if (!user) {
        return res.status(404).json({
          status: false,
          message: 'credential not found!',
          data: null,
        });
      }

      // check user isActive
      if (!user.is_active) {
        return res.status(403).json({
          status: false,
          message: 'Please verified your account first!',
          data: null,
        });
      }

      // create reset password token and exp
      const resetToken = generateToken({ email: user.email, userId: user.id }, '10m');
      const expiredDate = new Date(Date.now() + 10 * 60000);
      const uri = 'http://localhost:3000/reset-password';
      const URL_RESET = process.env.RESETPW_URL
        ? `${process.env.RESETPW_URL}?token=${resetToken}`
        : `${uri}?token=${resetToken}`;

      // html
      const htmlReset = await nodemailerLib.getHtml('reset-password-message.ejs', {
        user: {
          name: user.name,
          resetLink: URL_RESET,
        },
      });

      // if reset password token exist and not expired
      const resetTokenExist = await getResetToken(user.id);

      if (resetTokenExist) {
        const currentTime = new Date();
        if (currentTime < resetTokenExist.exp) {
          // just send email but not update token
          const { token } = resetTokenExist;
          const URL_RESET_OLD = process.env.RESETPW_URL
            ? `${process.env.RESETPW_URL}?token=${token}`
            : `${uri}?token=${token}`;

          const htmlResetNotUpdate = await nodemailerLib.getHtml('reset-password-message.ejs', {
            user: {
              name: user.name,
              resetLink: URL_RESET_OLD,
            },
          });
          nodemailerLib.sendEmail(user.email, 'Reset Password Request', htmlResetNotUpdate);

          // the token is sent directly to the client
          return res.status(202).json({
            status: true,
            message: 'link to reset password has been sent to the email client!',
            data: null,
          });
        }
      }

      // store to database
      await createResetToken(user.id, resetToken, expiredDate);

      // send email
      nodemailerLib.sendEmail(user.email, 'Reset Password Request', htmlReset);

      // the token is sent directly to the client
      return res.status(200).json({
        status: true,
        message: 'link to reset password has been sent to the email client!',
        data: null,
      });
    } catch (error) {
      next(error);
    }
    return null;
  },

  resetPassword: async (req, res, next) => {
    try {
      const { resetRequestToken } = req.body;
      const { error, value } = resetPasswordSchema.validate(req.body);

      if (!resetRequestToken) {
        return res.status(406).json({
          status: false,
          message: 'Unauthorized!',
          data: null,
        });
      }

      // verify token
      const decodedToken = verifyToken(resetRequestToken);

      if (decodedToken.error) {
        return res.status(406).json({
          status: false,
          message: 'Unauthorized!',
          data: null,
        });
      }

      // check if input error
      if (error) {
        return res.status(400).json({
          status: false,
          message: error.details[0].message,
          data: null,
        });
      }

      // check exp reset password
      const resetTokenExp = await getResetToken(decodedToken.userId);

      const now = new Date();

      if (now > resetTokenExp.exp) {
        return res.status(406).json({
          status: false,
          message: 'token has expired!',
          data: null,
        });
      }

      // Use the validated data (value) for further processing
      // eslint-disable-next-line camelcase
      const { password } = value;

      // hash password
      const hashPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));

      // update user
      await updateUserByEmail(decodedToken.email, { password: hashPassword });

      // update exp reset password
      await updateResetTokenExp(resetRequestToken);

      return res.status(200).json({
        status: true,
        message: 'success!',
        data: null,
      });
    } catch (error) {
      next(error);
    }
    return null;
  },
};
