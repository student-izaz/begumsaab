const Cart = require('../models/Cart');

// Add to Cart
exports.addToCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [{ productId, quantity: 1 }] });
    } else {
      const productIndex = cart.products.findIndex((p) => p.productId.equals(productId));
      if (productIndex > -1) {
        cart.products[productIndex].quantity += 1;
      } else {
        cart.products.push({ productId, quantity: 1 });
      }
    }
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
      const { userId, productId } = req.body;

      // Find user's cart
      const cart = await Cart.findOne({ userId });

      if (!cart) {
          return res.status(404).json({ message: "Cart not found" });
      }

      // Remove product
      cart.products = cart.products.filter(item => item.productId.toString() !== productId);

      await cart.save();

      res.status(200).json({ message: "Item removed from cart", cartItems: cart.products });
  } catch (error) {
      res.status(500).json({ message: "Failed to remove item from cart", error });
  }
};


// Get all cart items
exports.getCartItems = async (req, res) => {
  try {
      const { userId } = req.params;

      // Assuming Cart is a Mongoose model with a `products` array
      const cart = await Cart.findOne({ userId }).populate("products.productId");

      if (!cart) {
          return res.status(404).json({ message: "Cart is empty" });
      }

      res.status(200).json({ cartItems: cart.products });
  } catch (error) {
      res.status(500).json({ message: "Failed to fetch cart items", error });
  }
};

// Update quantity of a product in the cart
exports.updateCartItemQuantity = async (req, res) => {
    try {
        const { itemId, userId, action} = req.params; // Get user ID, product ID & action (+/-)

        let updateQuery = {};
        if (action === "increase") {
            updateQuery = { $inc: { "products.$.quantity": 1 } }; // Increase quantity
        } else if (action === "decrease") {
            updateQuery = { $inc: { "products.$.quantity": -1 } }; // Decrease quantity
        }

        const updatedCart = await Cart.findOneAndUpdate(
            { userId, "products.productId": itemId }, // Find cart of the user & product
            updateQuery,
            { new: true } // Return updated cart
        );

        if (!updatedCart) {
            return res.status(404).json({ message: "Cart item not found!" });
        }

        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};


