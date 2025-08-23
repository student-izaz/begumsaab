// models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  image: String,
  name: String,
  category: String,
  description: String,
  price: Number,
  tags: String
});

module.exports = mongoose.model('Product', ProductSchema);
