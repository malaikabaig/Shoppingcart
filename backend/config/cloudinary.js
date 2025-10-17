const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: 'dygvkxaw0', // Replace with your Cloud Name
  api_key: '459745922969943', // Replace with your API Key
  api_secret: '8gAKKo08x28HEcC3o1lCzUCOxb4', // Replace with your API Secret
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'shoppingcart', // Folder name on Cloudinary
    allowed_formats: ['jpeg', 'png', 'jpg'],
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
