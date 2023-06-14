// modules
const router = require('express').Router();

const authController = require('../controllers/auth.controller');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/reset-request', authController.resetPasswordRequest);
router.post('/reset-password', authController.resetPassword);

// otp
router.post('/otp/verify', authController.verifiedOTP);
router.get('/otp/resend', authController.resendOTP);

module.exports = router;
