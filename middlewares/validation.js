// middleware/validation.js
import { body, validationResult } from 'express-validator';
import { AppError } from '../utils/appError.js';

// Helper to check for missing required fields
function validateRequired(requiredFields, body) {
  return requiredFields.filter(
    field => body[field] === undefined || body[field] === null || body[field] === ''
  );
}

// Helper to validate date format (YYYY-MM-DD)
function validateDate(dateString) {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateString);
}

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};

export const validateUser = [
  body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('phoneNumber')
    .matches(/^\+\d{10,15}$/)
    .withMessage('Phone number must be in international format, e.g., +2348012345678'),
  validateRequest
];

export const validatePackingList = [
  body('name').trim().isLength({ min: 1 }),
  body('tripType').optional().isIn(['work', 'vacation', 'business', 'adventure', 'family']),
  body('destination').optional().trim(),
  validateRequest
];

export const validatePackingItem = [
  body('name').trim().isLength({ min: 1 }),
  body('category').optional().trim(),
  body('weight').optional().isNumeric(),
  body('isEssential').optional().isBoolean(),
  validateRequest
];

export const validateTrip = (req, res, next) => {
  const { start_date, end_date } = req.body;
  const errors = [];

  const missing = validateRequired(['destination', 'start_date', 'end_date'], req.body);
  if (missing.length > 0) {
    errors.push(`Missing required fields: ${missing.join(', ')}`);
  }

  if (start_date && !validateDate(start_date)) {
    errors.push('Invalid start date format');
  }

  if (end_date && !validateDate(end_date)) {
    errors.push('Invalid end date format');
  }

  if (start_date && end_date && new Date(start_date) > new Date(end_date)) {
    errors.push('Start date must be before end date');
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(', ') });
  }
  next();
};

// Handle validation errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    return next(new AppError(errorMessages.join('. '), 400));
  }
  next();
};

// Validation rules for change password
export const validateChangePassword = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('New password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  body('confirmPassword')
    .notEmpty()
    .withMessage('Confirm password is required')
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('Password confirmation does not match new password');
      }
      return true;
    }),
  
  handleValidationErrors
];

// Validation rules for forgot password
export const validateForgotPassword = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  handleValidationErrors
];

// Validation rules for reset password
export const validateResetPassword = [
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  body('confirmPassword')
    .notEmpty()
    .withMessage('Confirm password is required')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
  
  handleValidationErrors
];
