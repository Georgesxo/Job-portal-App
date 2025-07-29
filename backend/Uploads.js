// Uploads.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// ✅ Manually require dotenv here to ensure env vars are available
require('dotenv').config();

const cloudinary = require('cloudinary').v2;

console.log('🔐 In Uploads.js - CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY); // Debug

console.log('🔐 Cloudinary config:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  has_api_key: !!process.env.CLOUDINARY_API_KEY,
  has_api_secret: !!process.env.CLOUDINARY_API_SECRET,
});

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error('❌ Missing Cloudinary credentials');
}

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const folder = file.fieldname === 'profilePicture' ? 'jobboard/profiles' : 'jobboard/cvs';
    const resource_type = file.mimetype.startsWith('image/') ? 'image' : 'raw';

    return {
      folder,
      resource_type,
      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});

const upload = multer({ storage });

module.exports = upload;