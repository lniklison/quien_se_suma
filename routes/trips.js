const express = require('express');
const router = express.Router();
var _ = require('lodash');
let Trip = require('../models/Trip');

router.post('/', (req, res) => {
    
    let body = req.body;
    
    let trip = new Trip({
        
        id_conductor: body.id_conductor,
        pasajeros: body.pasajeros,
        origen: body.origen,
        destino: body.destino,
        id_pasajeros: body.id_pasajeros,
        duracion: body.duracion,
        latLngOrigen: body.latLngOrigen,
        latLngDestino: body.latLngDestino,
        fecha_salida: body.fecha_salida,
        hora_salida: body.hora_salida,
        minuto_salida: body.minuto_salida
    });


    
    trip.save(
        (err, tripDB) => {

        
        if (err)
            return res.status(400).json({
                ok: false,
                msj: 'Error creating Trip',
                errors: err
            });
    
        
        return res.json({
            ok: true,
            data: tripDB
        });
    });
});

router.get('/', (req, res) => {
    Trip
        .find({})
        .exec( (err, trip) => {
        
        
        if (err)
            return res.status(500).json({
                ok: false,
                msj: 'Error getting trips',
                errors: err
            });

        
        return res.json({
            ok: true,
            data: trip
        });
    });
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    Trip
        .findById(id)
        .exec( (err, trip) => {
            
        
        if (err)
            return res.status(500).json({
                ok: false,
                msj: 'Error getting the trip',
                errors: err
            });
        
        
        if (!trip)
            return res.status(500).json({
                ok: false,
                msj: 'Error, wrong id',
            });

        
        return res.json({
            ok: true,
            data: trip
        });
    });
});

router.put('/:id', async (req, res) => {
    let tripId = req.params.id;
    
    let body = req.body;
    
    let newPassengers = body.id_pasajeros;
    let capacity = body.pasajeros;

    try {
        let trip = await Trip.findById(tripId);

        
        if (_.size(newPassengers) == capacity) {
            throw new Error('The trip is already full');
        }

        trip.id_pasajeros = newPassengers;

        
        let tripDB = await trip.save();

        
        return res.json({
            ok: true,
            data: tripDB
        });
    
    } catch (err) {
        return res.status(500).json({
            ok: false,
            msj: 'Error adding user to trip',
            errors: err.message
        });
    }

});

module.exports = router;