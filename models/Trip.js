const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const tripSchema = new Schema({
    id_conductor: {
        type: String,
        required: true,
    },
    pasajeros: {
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
    id_pasajeros: {
        type: Array
    },
    duracion: {
        type: String
    },
    latLngOrigen: {
        type: Array
    },
    latLngDestino: {
        type: Array
    },
    fecha_salida: {
        type: String
    },
    hora_salida: {
        type: String
    },
    minuto_salida: {
        type: String
    }

});


const Trip = module.exports = mongoose.model('trips', tripSchema);