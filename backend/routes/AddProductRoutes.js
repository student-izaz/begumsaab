const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const {addProduct, upload} = require('../controllers/AddProductController');

router.post('/add', upload.single('image'), addProduct);

module.exports = router;