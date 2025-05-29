const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("../config/cloudinary");
const Product = require("../models/Product");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const random = uuidv4();
    cb(null, random + "" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// File Upload Handler  
const addProduct = async (req, res) => {
  const file = req.file.path;
  
  try {
    const { name, category, price, description, tags } = req.body;
    console.log( name, category, price, description, tags, file )
    const uploadRes = await cloudinary.uploader.upload(file, {
      timeout: 120000,
      resource_type: "auto",
    });

    // Delete file
    fs.unlink((req.file.path), function(err){
      if (err) console.log(err);
      else console.log('\nDeleted file');
    });

    //save data on database
    if (uploadRes) {
      const product = new Product({
        image: uploadRes.secure_url,
        name,
        category,
        description,
        price,
        tags
      });

      const savedProduct = await product.save();
      res.status(200).json({ msg: "Product saved", savedProduct });
    }
  } catch (error) {
    res.status(500).json({ msg: "Image not uploded..." });
    console.log("file upload error", error);
  }
};

module.exports = { upload, addProduct };
