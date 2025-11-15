// controllers/authController.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if(userExists){
      return res.status(201).json({ msg: "User already exists..." }) 
    }

    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ msg: "Registered Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed Register😒" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ msg: "Please provide email and password" });
    } 

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { 
        id: user._id,
        email: user.email, 
        isAdmin: user.isAdmin 
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    await User.updateOne({ _id: user._id }, { $set: { refreshToken: token } });
    res.json({ token, id: user._id, msg: "You are login!" });
    // console.log("logedin");
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

// To send user data - user logic 

const getUserData = async (req, res) => {
  try {
    const userData = req.user;
    return res.status(200).json(userData);
  } catch (error) {
    console.log('Error from the user route', error)
  }
}

module.exports = { register, login, getUserData };