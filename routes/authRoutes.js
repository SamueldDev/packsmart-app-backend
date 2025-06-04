import { Router } from 'express';
import { register, login, getProfile, updateProfile } from '../controllers/authControllers.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { validateUserRegistration, validateUserLogin } from '../middlewares/validation.js';
import { authLimiter } from '../middlewares/rateLimiter.js';
import { body } from 'express-validator';

const router = Router();

router.post('/register', authLimiter, validateUserRegistration, register);
router.post('/login', authLimiter, [
  body('email').isEmail().normalizeEmail(),
  body('password').exists(),
  validateUserLogin
], login);
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, [
  body('name').optional().trim().isLength({ min: 2 }),
  body('email').optional().isEmail().normalizeEmail(),
  validateUserLogin
], updateProfile);

export default router;