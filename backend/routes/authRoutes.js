// routes/authRoutes.js
const express = require('express');
const { register, login, getUserData } = require('../controllers/authController');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/user', authMiddleware, getUserData);

module.exports = router;
