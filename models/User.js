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
    marca_auto: {
        type: String,
    },
    modelo_auto: {
        type: String,
    },
    year: {
        type: Number,
    },
    patente: {
        type: String,
    },
    observaciones: {
        type: String,
    },
    fotos: {
        type: String,
    }
});

 userSchema.plugin(uniqueValidator);

const User = module.exports = mongoose.model('user', userSchema);