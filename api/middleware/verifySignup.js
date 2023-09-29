const User = require('../models/user')

const verifySignup = async (req, res, next) => {
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