// middleware/validation.js
import { body, param, validationResult } from 'express-validator';

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
