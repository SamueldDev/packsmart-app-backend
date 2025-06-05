// middleware/validation.js
import { body, param, validationResult } from 'express-validator';

// Helper to check for missing required fields
function validateRequired(requiredFields, body) {
  return requiredFields.filter(
    field => body[field] === undefined || body[field] === null || body[field] === ''
  );
}

// Helper to validate date format (YYYY-MM-DD)
function validateDate(dateString) {
  // Simple regex for YYYY-MM-DD
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
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('name').trim().isLength({ min: 2 }),
  validateRequest
];

export const validateList = [
  body('name').trim().isLength({ min: 1 }),
  body('tripType').optional().isIn(['work', 'vacation', 'business', 'adventure', 'family']),
  body('destination').optional().trim(),
  validateRequest
];

export const validateListItem = [
  body('name').trim().isLength({ min: 1 }),
  body('category').optional().trim(),
  body('weight').optional().isNumeric(),
  body('isEssential').optional().isBoolean(),
  validateRequest
];

export const validateTrip = (req, res, next) => {
  const { destination, start_date, end_date } = req.body;
  const errors = [];

  // Check required fields
  const missing = validateRequired(['destination', 'start_date', 'end_date'], req.body);
  if (missing.length > 0) {
    errors.push(`Missing required fields: ${missing.join(', ')}`);
  }

  // Validate dates
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