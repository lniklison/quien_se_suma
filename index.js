const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
var bodyParser = require('body-parser');
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


// Route files
let users = require('./routes/users');
app.use('/users', users);


const PORT = process.env.PORT || 3000
app.listen(PORT)