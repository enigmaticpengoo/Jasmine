const { verifySignup } = require("../middleware/verifySignup");
const { login, signup } = require("../controllers/auth.controller");

let refreshTokens = []

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header();
    next();
  });

  app.post("/api/auth/signup", verifySignup, signup);

  app.post("/api/auth/login", login);

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
};