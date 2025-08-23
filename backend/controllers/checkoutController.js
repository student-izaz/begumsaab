const Checkout = require('../models/checkoutInfo');

const checkout = async (req, res) => {
    try {
        const data = req.body;
        const checkout = new Checkout(data);
        checkout.save();
        res.status(200).json({ msg: "Checkout OK" });
    } catch (error) {
        res.status(400).json({ msg: "Checkout Failed" });
        console.log(error)
    }
}

module.exports = checkout;