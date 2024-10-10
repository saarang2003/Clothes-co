const mongoose = require('mongoose');
require('dotenv').config();

const connectToDb = mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

module.exports = connectToDb;
