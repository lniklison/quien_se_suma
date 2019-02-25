const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const tripSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    driver: {
        type: String,
        required: true,
    },
    capacity: {
        type: String,
        required: true,
    }, 
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    passengers: {
        type: Array
    },
    duration: {
        type: String
    }
});


const Trip = module.exports = mongoose.model('trips', tripSchema);