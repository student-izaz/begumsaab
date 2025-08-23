// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authenticate = require("../middlewares/authMiddleware");
// const upload = require("../middlewares/upload");

// router.post("/add", productController.createProduct); // Route for creating a product
router.get("/", productController.getAllProducts); // Route for getting all products
router.get("/category/:category", productController.getProductsByCategory); // Route to get products by category
router.get("/:productId", productController.getSingleProductById); //Route to get single product
router.get("/related-products/:byCategory/:id", productController.findRelatedProducts);

module.exports = router;
