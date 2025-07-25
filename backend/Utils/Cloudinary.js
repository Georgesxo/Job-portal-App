// utils/cloudinary.js
const cloudinary = require('./utils/cloudinary').v2;

// Log to confirm values are present
console.log('📌 CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('📌 CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY);
console.log('📌 CLOUDINARY_API_SECRET exists:', !!process.env.CLOUDINARY_API_SECRET);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;