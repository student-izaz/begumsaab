const Product = require('../models/Product');

const getOriginalPakistanWear = async (req, res) => {
    try {
      const products = await Product.find({ category: "maria b winter luxe" });
      if(products.length === 0){
        return res.status(400).json({ msg: "Product Not Available" })
      }
      res.status(200).json(products);
    } catch (error) {
      res.status(400).json({msg: "getOriginalPakistanWear",error})
    }
  }

  module.exports = getOriginalPakistanWear;