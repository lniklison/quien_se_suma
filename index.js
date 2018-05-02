const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const passport = require('passport');
const expressValidator = require('express-validator');
require('./models/User');

const app = express();

// Use validator
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

// Parse request
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Connection to mlab (mongo db)
mongoose.connect(keys.mongoURI);

// Passport Config
require('./config/passport')(passport);

// // Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Route files
let users = require('./routes/users');
app.use('/users', users);


const PORT = process.env.PORT || 3000
app.listen(PORT)