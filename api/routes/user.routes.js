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

app.get('/user/login', async (req, res) => {
    credentials = await User.findOne({ username: 'asdf' }).select({ username: 1, password: 1})
    console.log(credentials)
    res.json(credentials)
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

app.put('/user/:id', (req, res) => {
    res.send('Edit User' + req.params.id)
})

app.delete('/user/:id', (req, res) => {
    res.send('Delete User' + req.params.id)
})
}