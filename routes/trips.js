const express = require('express');
const router = express.Router();
var _ = require('lodash');
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

router.put('/:id', async (req, res) => {
    let tripId = req.params.id;
    // parse body request
    let body = req.body;
    
    let newPassengers = body.passengers;
    let capacity = body.capacity;

    try {

        // if trip is 'Closed', do not allow add user
        if (_.size(newPassengers) == capacity) {
            throw new Error('The trip is already full');
        }


        // decrement user stock
        user.stock -= newUser.quantity;

        // save user
        let userDB = await user.save();

        // add user to trip
        // if the Trip already has that user increment the quantity
        if(trip.items.id(newUser._id)){
            trip.items.id(newUser._id).quantity += newUser.quantity
        } else { // if not, add it to items
            trip.items.push(newUser);
        }

        // save trip
        let tripDB = await trip.save();

        // return updated trip
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