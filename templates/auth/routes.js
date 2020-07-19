const express = require('express')
const router = express.Router()
const userController = require('./controller')
const userValidator = require('./validator')
const validator = require('express-joi-validation').createValidator({ passError: true })

router.post('/signup', [validator.body(userValidator.signupSchema, { joi: { allowUnknown: false } }), userController.signup])

router.post('/login', [validator.body(userValidator.loginSchema, { joi: { allowUnknown: false } }), userController.login])

router.post('/token', [validator.headers(userValidator.tokenSchema, { joi: { allowUnknown: false } }), userController.token])

module.exports = router