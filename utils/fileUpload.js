// utils/fileUpload.js
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getUploadPath = (folder = 'uploads') => {
  return join(__dirname, '..', 'public', folder);
};

export const getFileUrl = (req, folder, filename) => {
  return `${req.protocol}://${req.get('host')}/${folder}/${filename}`;
};

// Allowed image types
export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

// File validation
export const validateImageFile = (file) => {
  if (!file) {
    throw new Error('No file provided');
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
    throw new Error('Invalid file type. Only JPEG, PNG, and WebP images are allowed');
  }

  // 5MB limit
  if (file.size > 5 * 1024 * 1024) {
    throw new Error('File too large. Maximum size is 5MB');
  }

  return true;
};