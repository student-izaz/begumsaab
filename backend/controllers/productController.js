const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
    console.log(products)
  } catch (error) {
    res.status(500).json({ error: "Could not fetch products" });
  }
};

// Controller function to get products by category
const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params; // Get category from URL parameters
    const products = await Product.find({ category }); // Find products by category
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found in this category" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve products" });
  }
};

const getSingleProductById = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

const findRelatedProducts = async (req, res) => {
  const category = req.params;
  try {
    const products = await Product.find({
      category: category.byCategory,
      _id: { $ne: category.id },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ msg: "Not find releted products ", error });
    console.log("Not find releted products ", error);
  }
};

module.exports = {
  getAllProducts,
  getProductsByCategory,
  getSingleProductById,
  findRelatedProducts,
};
