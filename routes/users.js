const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
let User = require('../models/User');

router.post('/', function (req, res) {

    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;
    const marca_auto = req.body.marca_auto;
    const modelo_auto = req.body.modelo_auto;
    const year = req.body.year;
    const patente = req.body.patente;
    const observaciones = req.body.observaciones;
    const fotos = req.body.fotos;

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    let errors = req.validationErrors();

    if (errors) {
        res.sendStatus(422);
    }

    let newUser = new User({
        name: name,
        email: email,
        username: username,
        password: password,
        marca_auto: marca_auto,
        modelo_auto: modelo_auto,
        year: year,
        patente: patente,
        observaciones: observaciones,
        fotos: fotos
    });

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            if (err) {
                console.log(err);
            }
            newUser.password = hash;
            newUser.save();
            res.sendStatus(201)
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
   var pepe = req.session;
   res.send(pepe);
});


router.get('/', (req, res) => {
    User
        .find({})
        .exec( (err, user) => {
        
        // if there was a error
        if (err)
            return res.status(500).json({
                ok: false,
                msj: 'Error getting users',
                errors: err
            });

        // return a user list
        return res.json({
            ok: true,
            data: user
        });
    });
});

router.get('/:id', (req, res, next) => {
    var id = req.params.id;
    User
        .findById(id)
        .exec( (err, user) => {
            
        // if there was a error
        if (err)
            return res.status(500).json({
                ok: false,
                msj: 'Error getting the user',
                errors: err
            });

        // if id does not exists
        if (!user)
            return res.status(500).json({
                ok: false,
                msj: 'Error, wrong id',
            });

        // return a given user
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