const express = require('express');
const router = express.Router();
const resetPasswordOptionController = require('../controllers/registrationController/resetPasswordOptionController');
const resetPasswordController = require('../controllers/registrationController/resetPasswordController')
const registrationController = require('../controllers/registrationController/registerController')
const verifyEmailController = require('../controllers/registrationController/verifyemailController')
const {verifyLogin} = require('../controllers/registrationController/loginController');

//Verify Login
router.post('/login', verifyLogin)

//Reset Password
router.post('/reset-password', resetPasswordOptionController.resetPasswordOption)

//Update Password
router.post('/update-password', resetPasswordController.resetPassword)

//Register new UserPage
router.post('/register-user', registrationController.registerUser)

//Verify New email
router.get('/verify-email', verifyEmailController.verifyEmail)


module.exports = router;