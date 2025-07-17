const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require('path');
const connectDB = require("./config/db");
const bodyParser = require('body-parser');
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require('./routes/categoryRoutes');
const cartRoutes = require('./routes/cartRoutes');
const originalPakistanWearRoutes = require('./routes/originalPakistanWearRoutes');
const AddProductRoutes = require('./routes/AddProductRoutes');
const adminRoutes = require('./routes/adminRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');

dotenv.config();
const app = express();
connectDB();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://begumsaab.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware to allow preflight requests
app.options("*", cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // For URL-encoded data
app.use(express.static("public")); // Serve static files

// Handle undefined routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});


// Authentication Routes
app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/product-category', originalPakistanWearRoutes);

// Checkout Routes
app.use("/api/checkout", checkoutRoutes);

// Admin Routes
app.use('/api/product', AddProductRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  
