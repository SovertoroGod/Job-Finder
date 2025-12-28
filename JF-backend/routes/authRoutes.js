const express = require('express');
const { registerUser, loginUser } = require('./../controllers/authControllers');
const { validateRegister, validateLogin } = require('./../validations/authValidation');
const { handleValidateErrors } = require('./../middlewares/validateErrorHandler');
const router = express.Router();

router.post('/auth/register', validateRegister, handleValidateErrors, registerUser);
router.post('/auth/login', validateLogin, handleValidateErrors, loginUser);

module.exports = router; 