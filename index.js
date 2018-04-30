const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const app = express();

mongoose.connect(keys.mongoURI);


const PORT = process.env.PORT || 3000

app.listen(PORT)