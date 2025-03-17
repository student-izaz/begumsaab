const express = require('express');
const router = express.Router();
const adminMiddleware = require('../middlewares/adminMiddleware');
const authenticate = require('../middlewares/authMiddleware');
const {adminLogin, addCategory, allProducts} = require('../controllers/adminController')

router.post('/login', authenticate, adminMiddleware, adminLogin );
router.post('/category/add', authenticate, adminMiddleware, addCategory );
router.get('/all-products', allProducts)

module.exports = router;