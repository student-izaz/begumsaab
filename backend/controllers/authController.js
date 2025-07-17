const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });
<<<<<<< HEAD
    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ msg: "Registered successfully" });
=======
    if(userExists){
      return res.status(201).json({ msg: "User already exists..." }) 
    }

    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ msg: "Registered Successfully" });
>>>>>>> 8638b3e9b3eb5f48e87f74eb5d6421f22505ab5d
  } catch (error) {
    console.error("Error in register:", error);
    res.status(500).json({ error: "Registration failed" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    return res.status(200).json({
      success: true,
      msg: "You are logged in!",
      data: { token, id: user._id }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
};

const getUserData = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.error("Error in user route:", error);
    res.status(500).json({ error: "Failed to retrieve user data" });
  }
};

module.exports = { register, login, getUserData };
