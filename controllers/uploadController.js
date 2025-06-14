// controllers/uploadController.js
import multer from 'multer';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { User } from '../models/userModel.js';
import { AppError } from '../utils/appError.js';
import { catchAsync } from '../utils/catchAsync.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for memory storage
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Middleware to upload single profile picture
export const uploadUserPhoto = upload.single('profilePicture');

// Middleware to handle multer errors
export const handleMulterError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return next(new AppError('File too large. Maximum size is 5MB.', 400));
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return next(new AppError('Too many files uploaded.', 400));
    }
  }
  next(error);
};

// Resize and save profile picture
export const resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  // Generate unique filename
  const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;
  
  // Ensure uploads directory exists
  const uploadsDir = path.join(__dirname, '..', 'public', 'img', 'users');
  await fs.mkdir(uploadsDir, { recursive: true });

  // Process and save image
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(path.join(uploadsDir, filename));

  req.file.filename = filename;
  next();
});

// Update user profile picture
export const updateProfilePicture = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError('Please upload a profile picture', 400));
  }

  const user = await User.findByPk(req.user.id);
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  // Delete old profile picture if it exists
  if (user.profilePicture) {
    const oldImagePath = path.join(
      __dirname, 
      '..', 
      'public', 
      'img', 
      'users', 
      path.basename(user.profilePicture)
    );
    
    try {
      await fs.unlink(oldImagePath);
    } catch (error) {
      // File might not exist, continue anyway
      console.log('Could not delete old profile picture:', error.message);
    }
  }

  // Update user with new profile picture URL
  const profilePictureUrl = `${req.protocol}://${req.get('host')}/img/users/${req.file.filename}`;
  
  await user.update({ profilePicture: profilePictureUrl });

  res.status(200).json({
    status: 'success',
    message: 'Profile picture updated successfully',
    data: {
      user
    }
  });
});

// Remove profile picture
export const removeProfilePicture = catchAsync(async (req, res, next) => {
  const user = await User.findByPk(req.user.id);
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  // Delete profile picture file if it exists
  if (user.profilePicture) {
    const imagePath = path.join(
      __dirname, 
      '..', 
      'public', 
      'img', 
      'users', 
      path.basename(user.profilePicture)
    );
    
    try {
      await fs.unlink(imagePath);
    } catch (error) {
      console.log('Could not delete profile picture file:', error.message);
    }
  }

  // Update user to remove profile picture
  await user.update({ profilePicture: null });

  res.status(200).json({
    status: 'success',
    message: 'Profile picture removed successfully',
    data: {
      user
    }
  });
});

// Get user profile with picture
export const getUserProfile = catchAsync(async (req, res, next) => {
  const user = await User.findByPk(req.user.id);
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});