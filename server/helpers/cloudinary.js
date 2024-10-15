const express = require('express');
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
require('dotenv').config();


console.log( process.env.API_SECRET)
console.log( process.env.API_KEY)
console.log( process.env.CLOUD_NAME)
// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME || 'cloudinary',
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});



// Configure multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

async function imageUploadUtil(file) {
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
      timestamp: Math.round(new Date().getTime() / 1000)
    });
    
    return result;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
}

module.exports = { upload, imageUploadUtil };