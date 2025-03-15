// routes/cartRoutes.js
const express = require('express');
const { addToCart, removeFromCart, getCartItems, updateCartItemQuantity } = require('../controllers/cartController');
const router = express.Router();

router.post('/add', addToCart);
router.post('/remove', removeFromCart);
router.get("/:userId", getCartItems);
router.get("/updateItemQuantity/:itemId/:userId/:action", updateCartItemQuantity);

module.exports = router;
