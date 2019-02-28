const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
var _ = require('lodash');
let Passenger = require('../models/Passenger');


router.post('/', (req, res) => {
    
    let body = req.body;
    
    let passenger = new Passenger({
        id_conductor: body.id_conductor,
    });
    
    passenger.save(
        (err, passengerDB) => {

        
        if (err)
            return res.status(400).json({
                ok: false,
                msj: 'Error creating Passenger',
                errors: err
            });
    
        
        return res.json({
            ok: true,
            data: passengerDB
        });
    });
});

router.get('/', (req, res) => {
    Passenger
        .find({})
        .exec( (err, passenger) => {
        
        
        if (err)
            return res.status(500).json({
                ok: false,
                msj: 'Error getting passengers',
                errors: err
            });

        
        return res.json({
            ok: true,
            data: passenger
        });
    });
});

router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    Passenger
        .findById(id)
        .exec( (err, passenger) => {
            
        
        if (err)
            return res.status(500).json({
                ok: false,
                msj: 'Error getting the passenger',
                errors: err
            });

        
        if (!passenger)
            return res.status(500).json({
                ok: false,
                msj: 'Error, wrong id',
            });

        
        return res.json({
            ok: true,
            data: passenger
        });
    });
});

router.put('/:id', async (req, res) => {
    let passengerId = req.params.id;
    let body = req.body;
    let newDriver = body.id_conductor;

    try {
        let passenger = await Passenger.findById(passengerId);
        passenger.id_conductor = newDriver;
        
        let passengerDB = await passenger.save();

        return res.json({
            ok: true,
            data: passengerDB
        });
    
    } catch (err) {
        return res.status(500).json({
            ok: false,
            msj: 'Error adding user to passenger',
            errors: err.message
        });
    }

});

module.exports = router;


module.exports = router;