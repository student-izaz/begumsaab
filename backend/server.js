const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
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
    origin: "https://begumsaab.vercel.app", // Allow frontend domain
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow required methods
    credentials: true, // Allow cookies if needed
  })
);

// Middleware to allow preflight requests
app.options("*", cors());

app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // For URL-encoded data

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
  
