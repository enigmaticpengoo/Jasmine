const User = require('../models/user')
const signupSchema = require('../helpers/signuphelper')

const verifySignup = async (req, res, next) => {
    try {
      const result = signupSchema.validate({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        retypedPassword: req.body.retypedPassword
      })

      if (result.error) {
        throw result.error.message
      }
    }
    catch(err) {
      console.log(err)
      res.send({ error: err })
      return
    }
  
    await User.findOne({
      email: req.body.email
    }).then(async(user) => {  
      if (user) {
        console.log('email already in use')
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }
      
      next()
      });
  };

  module.exports = { verifySignup }