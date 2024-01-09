require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Routes
require('./routes/auth.routes')(app);
require('./routes/post.routes')(app)
require('./routes/user.routes')(app)

const clientPath = __dirname.replace('api', 'client')

app.use(express.static(path.join(clientPath, 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(clientPath, 'build', 'index.html'));
});

mongoose.connect('mongodb://127.0.0.1:27017/twitterclone', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => console.log('Connected to db'))
    .catch(console.error)

app.listen(3001, () => { console.log("Server running on port 3001...")})
app.listen(3000, () => { console.log("Server running on port 3000...")})