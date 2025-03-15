const mongoose = require('mongoose');

const checkoutInfoSchema = mongoose.Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    country: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        require: true,
    },
    city: {
        type: String,
        require: true,
    },
    state: {
        type: String,
        require: true,
    },
    pin_code: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true
    },
    payment_mode: {
        type: String,
        require: true
    }
},{timestamps: true})

const CheckoutInfo = mongoose.model('CheckoutInfo', checkoutInfoSchema)

module.exports = CheckoutInfo;