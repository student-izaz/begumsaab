const Cart = require("../models/Cart");
const redisClient = require("../config/redis");

const getCacheKey = (userId) => `cart_items_${userId}`;

//
// Add To Cart
//
exports.addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.body;

    let cart = await Cart.findOneAndUpdate(
      { userId, "products.productId": productId },
      {
        $inc: {
          "products.$.quantity": 1,
        },
      },
      {
        new: true,
      }
    ).populate("products.productId");

    if (!cart) {
      cart = await Cart.findOneAndUpdate(
        { userId },
        {
          $push: {
            products: {
              productId,
              quantity: 1,
            },
          },
        },
        {
          upsert: true,
          new: true,
        }
      ).populate("products.productId");
    }

    // Update Redis Cache
    await redisClient.set(
      getCacheKey(userId),
      JSON.stringify(cart.products),
      {
        EX: 3600,
      }
    );

    res.status(200).json({
      message: "Product added successfully",
      cartItems: cart.products,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

//
// Remove From Cart
//
exports.removeFromCart = async (req, res) => {
  try {

    const userId = req.userId;
    const { productId } = req.body;

    const cart = await Cart.findOne({ userId }).populate("products.productId");

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    cart.products = cart.products.filter(
      (item) => item.productId._id.toString() !== productId
    );

    await cart.save();

    // Update Cache
    await redisClient.set(
      getCacheKey(userId),
      JSON.stringify(cart.products),
      {
        EX: 3600,
      }
    );

    res.status(200).json({
      message: "Item removed",
      cartItems: cart.products,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

//
// Get Cart Items
//
exports.getCartItems = async (req, res) => {

  try {

    const { userId } = req.params;

    const cacheKey = getCacheKey(userId);

    const cachedCart = await redisClient.get(cacheKey);

    if (cachedCart) {

      // console.log("Serving Cart From Redis");

      return res.status(200).json({
        cartItems: JSON.parse(cachedCart),
      });

    }

    const cart = await Cart.findOne({ userId })
      .populate("products.productId");

    if (!cart) {
      return res.status(404).json({
        message: "Cart Empty",
      });
    }

    await redisClient.set(
      cacheKey,
      JSON.stringify(cart.products),
      {
        EX: 3600,
      }
    );

    console.log("Serving Cart From MongoDB");

    res.status(200).json({
      cartItems: cart.products,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};

//
// Update Quantity
//
exports.updateCartItemQuantity = async (req, res) => {
  try {
    const userId = req.userId;

    const { itemId, action } = req.params;

    let updateQuery = {};

    if (action === "increase") {

      updateQuery = {
        $inc: {
          "products.$.quantity": 1,
        },
      };

    } else if (action === "decrease") {

      updateQuery = {
        $inc: {
          "products.$.quantity": -1,
        },
      };

    } else {

      return res.status(400).json({
        message: "Invalid action",
      });

    }

    const updatedCart = await Cart.findOneAndUpdate(
      {
        userId,
        "products.productId": itemId,
      },
      updateQuery,
      {
        new: true,
      }
    ).populate("products.productId");

    if (!updatedCart) {

      return res.status(404).json({
        message: "Cart Item Not Found",
      });

    }

    // Remove quantity <= 0

    updatedCart.products = updatedCart.products.filter(
      (item) => item.quantity > 0
    );

    await updatedCart.save();

    // Update Redis

    await redisClient.set(
      getCacheKey(userId),
      JSON.stringify(updatedCart.products),
      {
        EX: 3600,
      }
    );

    res.status(200).json({
      message: "Quantity Updated",
      cartItems: updatedCart.products,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};