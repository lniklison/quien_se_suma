const express = require('express');
const router = express.Router();
let Trip = require('../models/Trip');

router.post('/', (req, res) => {
    
    let body = req.body;
    
    let trip = new Trip({
        date: body.date,
        driver: body.driver,
        capacity: body.capacity,
        origen: body.origen,
        destino: body.destino,
        passengers: body.passengers,
        duracion: body.duracion,
        latLngOrigen: body.latLngOrigen,
        latLngDestino: body.latLngDestino,
        fecha_salida: body.fecha_salida,
        hora_salida: body.hora_salida,
        minuto_salida: body.minuto_salida,
        asignado: body.asignado
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

module.exports = router;