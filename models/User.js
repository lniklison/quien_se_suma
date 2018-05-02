const mongoose = require('mongoose');
require('mongoose-type-email');
 const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    googleId: {
        type: String,
    }
});

 userSchema.plugin(uniqueValidator);

const User = module.exports = mongoose.model('user', userSchema);