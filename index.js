const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const passport = require('passport');
const expressValidator = require('express-validator');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);

const app = express();

// Connection to mlab (mongo db)
mongoose.connect(keys.mongoURI);

app.use(session({
    secret: 'max',
    saveUninitialized: false,
    resave: false,
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    }) 
}));

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

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Passport Config
require('./config/passport')(passport);

// // Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Route files
let users = require('./routes/users');
let products = require('./routes/products');
app.use('/users', users);
app.use('/products', products);


const PORT = process.env.PORT || 3000
app.listen(PORT)