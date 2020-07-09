const Joi = require('@hapi/joi')

const signupSchema = Joi.object({
    username: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

const tokenSchema = Joi.object({
    Authorization: Joi.string().required()
})

module.exports = { signupSchema, loginSchema, tokenSchema }