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
    origen: {
        type: String,
        required: true
    },
    destino: {
        type: String,
        required: true
    },
    passengers: {
        type: Array
    },
    duracion: {
        type: String
    },
    latLngOrigen: {
        type: String
    },
    latLngDestino: {
        type: String
    },
    fecha_salida: {
        type: String
    },
    hora_salida: {
        type: Integer
    },
    hora_salida: {
        type: Integer
    },
    asignado: {
        type: Boolean
    },

});


const Trip = module.exports = mongoose.model('trips', tripSchema);