const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const folder = file.fieldname === 'profilePicture' ? 'jobboard/profiles' : 'jobboard/cvs';
    const resource_type = file.mimetype.startsWith('image/') ? 'image' : 'raw';

    return {
      folder,
      resource_type,
      public_id: `${Date.now()}-${file.originalname}`
    };
  }
});

const upload = multer({ storage });

module.exports = upload;
