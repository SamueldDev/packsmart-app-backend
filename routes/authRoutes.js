import { Router } from 'express';
import { register, login, getProfile, updateProfile } from '../controllers/authControllers.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { validateRequest, validateUser } from '../middlewares/validation.js';
import { authLimiter } from '../middlewares/rateLimiter.js';
import { body } from 'express-validator';

const router = Router();

router.post('/register', authLimiter, validateRequest, register);
router.post('/login', authLimiter, [
  body('email').isEmail().normalizeEmail(),
  body('password').exists(),
  validateUser
], login);
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, [
  body('name').optional().trim().isLength({ min: 2 }),
  body('email').optional().isEmail().normalizeEmail(),
  validateUser
], updateProfile);

export default router;