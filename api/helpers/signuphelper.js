const Joi = require('joi')

const signupSchema = Joi.object({
    firstName: Joi.string()
        .required()
        .min(2)
        .max(20),

    lastName: Joi.string()
        .required()
        .min(2)
        .max(20),

    email: Joi.string()
        .required()
        .email({ minDomainSegments: 2 }),

    password: Joi.string()
        .required()
        .pattern(new RegExp('^[a-zA-Z0-9]{8, 30}$')),

    retypedPassword: Joi.ref('password')
})

module.exports = signupSchema