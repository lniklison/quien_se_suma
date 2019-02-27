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
    const hora_salida = req.body.hora_salida;
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
        hora_salida: hora_salida,
        asignado: asignado
    });

    newTrip.save(function (err) {
        if (err) {
            console.log(err);
        } else res.sendStatus(201);
    });

});


module.exports = router;