const express = require('express');
const app = express();
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const passport = require('passport');
const port = process.env.PORT || 5000;

//mongoose.set('useUnifiedTopology', true);
require('./api/models/user')
require('./services/passport');

mongoose.connect(keys.mongoURI, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log("Connected to db...")
});

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./api/routes/authRoute')(app);

//used for build and deploy of app
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(port, () => {
    console.log("Server running on Port : " + port)
});