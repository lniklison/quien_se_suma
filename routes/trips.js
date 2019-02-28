const express = require('express');
const router = express.Router();
let Trip = require('../models/Trip');

router.post('/', function (req, res) {
    const date = req.body.date;
    const driver = req.body.driver;
    const capacity = req.body.capacity;
    const origen = req.body.origen;
    const destino = req.body.destino;
    const passengers = req.body.passengers;
    const duracion = req.body.duracion;
    const latLngOrigen = req.body.latLngOrigen;
    const latLngDestino = req.body.latLngDestino;
    const fecha_salida = req.body.fecha_salida;
    const hora_salida = req.body.hora_salida;
    const minuto_salida = req.body.minuto_salida;
    const asignado = req.body.asignado;

    let errors = req.validationErrors();

    if (errors) {
        res.sendStatus(422);
    }

    let newTrip = new Trip({
        date: date,
        driver: driver,
        capacity: capacity,
        origen: origen,
        destino: destino,
        passengers: passengers,
        duracion: duracion,
        latLngOrigen: latLngOrigen,
        latLngDestino: latLngDestino,
        fecha_salida: fecha_salida,
        hora_salida: hora_salida,
        minuto_salida: minuto_salida,
        asignado: asignado
    });

    newTrip.save(function (err) {
        if (err) {
            console.log(err);
        } else res.sendStatus(201);
    });

});

router.get('/', (req, res) => {
    Trip
        .find({})
        .exec( (err, trip) => {
        
        // if there was a error
        if (err)
            return res.status(500).json({
                ok: false,
                msj: 'Error getting trips',
                errors: err
            });

        // return a trip list
        return res.json({
            ok: true,
            data: trip
        });
    });
});

router.get('/:id', (req, res) => {
    var id = req.params.id;
    Trip
        .findById(id)
        .exec( (err, trip) => {
            
        // if there was a error
        if (err)
            return res.status(500).json({
                ok: false,
                msj: 'Error getting the trip',
                errors: err
            });
        
        // if id does not exists
        if (!trip)
            return res.status(500).json({
                ok: false,
                msj: 'Error, wrong id',
            });

        // return a given trip
        return res.json({
            ok: true,
            data: trip
        });
    });
});

module.exports = router;