// config/db.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI
      // {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // serverSelectionTimeoutMS: 5000, 
    //}
  );
    console.log("MongoDB connected...");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};

module.exports = connectDB;


// const connectDB = async () => {
//     await mongoose.connect('mongodb+srv://izaz:837690@cluster0.yma94.mongodb.net/begumsaab_DB').then(()=>console.log('Db connected...'))
// } 

// module.exports = connectDB;