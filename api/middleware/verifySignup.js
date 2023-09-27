const User = require('../models/user')

const verifySignup = async (req, res, next) => {
    await User.findOne({
      username: req.body.username
    }).then(async(user) => {  
      if (user) {
        console.log('username already in use')
        res.status(400).send({ message: "Failed! Username is already in use!" });
        return;
      }

      await User.findOne({
        email: req.body.email
      }).then((user) => { 
        if (user) {
          console.log('email already in use')
          res.status(400).send({ message: "Failed! Email is already in use!" });
          return;
        }
      });
    }).then(() => next())
  };

  module.exports = { verifySignup }