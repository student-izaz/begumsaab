// routes/cartRoutes.js
const express = require('express');
const { addToCart, removeFromCart, getCartItems, updateCartItemQuantity } = require('../controllers/cartController');
const router = express.Router();
const authenticate = require('../middlewares/authMiddleware');

router.post('/add', authenticate, addToCart);
router.post('/remove', authenticate, removeFromCart);
router.get("/:userId", authenticate, getCartItems);
router.get("/updateItemQuantity/:itemId/:userId/:action", authenticate, updateCartItemQuantity);

module.exports = router;
