const mongoose = require('mongoose');
require('mongoose-type-email');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    }
});


const User = module.exports = mongoose.model('product', userSchema);