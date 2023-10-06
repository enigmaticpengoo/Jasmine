const User = require('../models/user')


module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header();
      next();
    });
app.get('/user', (req, res) => {
    res.send('User')
})

app.get('/users', (req, res) => {
    res.json('Users')
})

app.post('/user/signup', (req, res) => {
    console.log(req.body)
    
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    })

    user.save()
    
    res.json(user)
})

app.delete('/user/delete/:email', async (req, res) => {
    const user = await User.deleteOne({ email: req.params.email })

    res.json(user)
})
}