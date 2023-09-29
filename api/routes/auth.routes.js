const { verifySignup } = require("../middleware/verifySignup");
const { login, signup } = require("../controllers/auth.controller");
const RefreshToken = require("../models/refreshTokens");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header();
    next();
  });

  app.post("/auth/signup", verifySignup, signup);

  app.post("/auth/login", login);

  app.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      const accessToken = generateAccessToken({ name: user.name })
      res.json({accessToken: accessToken})
    })
  })

  app.delete('/logout', (req, res) => {
    RefreshToken.deleteOne({ email: 'falbokev@gmail.com'})
    res.sendStatus(204)
  })

  app.get('/getrequest', async (req, res) => {
    const refresh = await RefreshToken.findOne({ email: 'falbokev@gmail.com' }, 'value')
    
    res.send(refresh["value"])
  })
};

