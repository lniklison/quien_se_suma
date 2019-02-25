const express = require('express');
const router = express.Router();
let Trip = require('../models/Trip');

router.post('/', function (req, res) {
    const date = req.body.date;
    const driver = req.body.driver;
    const capacity = req.body.capacity;
    const origin = req.body.origin;
    const destination = req.body.destination;
    const passengers = req.body.passengers;
    const duration = req.body.duration;
    
    req.checkBody('date', 'Date is required').notEmpty();
    req.checkBody('origin', 'Origin is required').notEmpty();
    req.checkBody('destination', 'Destination is not valid').notEmpty();
    req.checkBody('capacity', 'Capacity is required').notEmpty();

    let errors = req.validationErrors();

    if (errors) {
        res.sendStatus(422);
    }

    let newTrip = new Trip({
        date: date,
        driver: driver,
        capacity: capacity,
        origin: origin,
        destination: destination,
        passengers: passengers,
        duration: duration
    });

    newTrip.save(function (err) {
        if (err) {
            console.log(err);
        } else res.sendStatus(201);
    });

});


module.exports = router;