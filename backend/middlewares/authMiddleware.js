// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');

const authenticate = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const isVerified = jwt.verify(token, process.env.JWT_SECRET);

    const userData = await User.findOne({ email: isVerified.email}).select({password: 0,});

    req.user = userData;
    req.token = token;
    req.userId = userData._id;

    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

module.exports = authenticate;
