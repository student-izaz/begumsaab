const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const cartRoutes = require("./routes/cartRoutes");
const originalPakistanWearRoutes = require("./routes/originalPakistanWearRoutes");
const AddProductRoutes = require("./routes/AddProductRoutes");
const adminRoutes = require("./routes/adminRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");

dotenv.config();
const app = express();
connectDB();

// ✅ Define CORS options once
const corsOptions = {
  origin: "https://begumsaab-student-izazs-projects.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // For preflight

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/product-category", originalPakistanWearRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/product", AddProductRoutes);
app.use("/api/admin", adminRoutes);

// ✅ Catch-all route for frontend SPA
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
