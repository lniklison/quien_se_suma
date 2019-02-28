const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
var _ = require('lodash');
let User = require('../models/User');


router.post('/', (req, res) => {
    
    let body = req.body;
    
    let user = new User({
        name: body.name,
        email: body.email,
        username: body.username,
        password: body.password,
        marca_auto: body.marca_auto,
        modelo_auto: body.modelo_auto,
        year: body.year,
        patente: body.patente,
        observaciones: body.observaciones,
        fotos: body.fotos
    });
    
    user.save(
        (err, userDB) => {

        
        if (err)
            return res.status(400).json({
                ok: false,
                msj: 'Error creating User',
                errors: err
            });
    
        
        return res.json({
            ok: true,
            data: userDB
        });
    });
});

router.post('/login', function (req, res, next) {
    passport.authenticate('local', {
        successRedirect: res.end("Loged in!"),
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', function (req, res) {
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('/users/login');
});


router.get('/profile' ,function (req, res) {
   let pepe = req.session;
   res.send(pepe);
});


router.get('/', (req, res) => {
    User
        .find({})
        .exec( (err, user) => {
        
        
        if (err)
            return res.status(500).json({
                ok: false,
                msj: 'Error getting users',
                errors: err
            });

        
        return res.json({
            ok: true,
            data: user
        });
    });
});

router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    User
        .findById(id)
        .exec( (err, user) => {
            
        
        if (err)
            return res.status(500).json({
                ok: false,
                msj: 'Error getting the user',
                errors: err
            });

        
        if (!user)
            return res.status(500).json({
                ok: false,
                msj: 'Error, wrong id',
            });

        
        return res.json({
            ok: true,
            data: user
        });
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    res.redirect('/login');
}


module.exports = router;