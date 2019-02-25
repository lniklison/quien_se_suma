const express = require('express');
const router = express.Router();
let Product = require('../models/Product');

router.post('/', function (req, res) {

    const name = req.body.name;
    const price = req.body.price;
    const image = req.body.image;
    const description = req.body.description;

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('price', 'Price is required').notEmpty();
    req.checkBody('image', 'Image is not valid').notEmpty();
    req.checkBody('description', 'Description is required').notEmpty();

    let errors = req.validationErrors();

    if (errors) {
        res.sendStatus(422);
    }

    let newProduct = new Product({
        name: name,
        price: price,
        image: image,
        description: description
    });

    newProduct.save(function (err) {
        if (err) {
            console.log(err);
        } else res.sendStatus(201);
    });

});


module.exports = router;