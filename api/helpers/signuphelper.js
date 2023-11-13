const Joi = require('joi')

const signupSchema = Joi.object({
    firstName: Joi.string()
        .required()
        .max(30)
        .messages({
            'string.max':'First Name can be a maximum of 30 characters',
            'string.empty':'First Name is a required field'
        }),

    lastName: Joi.string()
        .required()
        .max(30)
        .messages({
            'string.max':'Last Name can be a maximum of 30 characters',
            'string.empty':'Last Name is a required field'
        }),

    email: Joi.string()
        .required()
        .email({ minDomainSegments: 2 })
        .max(50)
        .messages({
            'string.max':'Email can be a maximum of 50 characters',
            'string.empty':'Email is a required field',
            'string.email':'Please enter a valid email'
        }),

    password: Joi.string()
        .required()
        .pattern(new RegExp(/^[a-zA-Z0-9]{8,30}$/))
        .pattern(new RegExp(/[A-Z]{1,}/))
        .pattern(new RegExp(/[0-9]{1,}/))
        .messages({
            'string.empty':'Password is a required field'
        }),

    retypedPassword: Joi.string()
        .messages({ 'any.only':'Passwords must match' })
        .valid(Joi.ref('password'))
})

module.exports = signupSchema