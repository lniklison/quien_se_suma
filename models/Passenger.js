const mongoose = require('mongoose');
require('mongoose-type-email');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const passengerSchema = new Schema({
    id_conductor: {
        type: String
    }
});

passengerSchema.plugin(uniqueValidator);

const Passenger = module.exports = mongoose.model('passenger', passengerSchema);