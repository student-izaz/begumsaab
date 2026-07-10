const express = require("express");

const router = express.Router();

const authenticate = require("../middlewares/authMiddleware");

const {
  addToCart,
  removeFromCart,
  getCartItems,
  updateCartItemQuantity,
} = require("../controllers/cartController");

router.post("/add", authenticate, addToCart);

router.delete("/remove", authenticate, removeFromCart);

router.get("/:userId", authenticate, getCartItems);

// Better to use PATCH for updates
router.patch(
  "/updateItemQuantity/:itemId/:action",
  authenticate,
  updateCartItemQuantity
);

module.exports = router;