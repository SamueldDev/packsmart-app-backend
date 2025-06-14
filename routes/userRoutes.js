import { Router } from 'express';
import { register, login, getProfile, updateProfile, changePassword, forgotPassword, resetPassword } from '../controllers/userControllers.js';
import { authenticateToken, protect } from '../middlewares/authMiddleware.js';
import { validateRequest, validateUser, validateChangePassword, validateForgotPassword, validateResetPassword } from '../middlewares/validation.js';
import { authLimiter } from '../middlewares/rateLimiter.js';
import { body } from 'express-validator';
import { uploadUserPhoto, handleMulterError, resizeUserPhoto, updateProfilePicture, removeProfilePicture } from '../controllers/uploadController.js';

const router = Router();

router.post('/register', authLimiter, validateRequest, register);
router.post('/login', authLimiter, [
  body('email').isEmail().normalizeEmail(),
  body('password').exists(),
], login);

router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, [
  body('name').optional().trim().isLength({ min: 2 }),
  body('email').optional().isEmail().normalizeEmail(),
  validateUser
], updateProfile);

// Public routes
router.post('/forgot-password', validateForgotPassword, forgotPassword);
router.patch('/reset-password/:token', validateResetPassword, resetPassword);

// Protected routes (require authentication)
router.use(protect); // All routes after this middleware are protected

// Password management
router.patch('/change-password', validateChangePassword, changePassword);
router.patch(
  '/profile-picture',
  uploadUserPhoto,
  handleMulterError,
  resizeUserPhoto,
  updateProfilePicture
);
router.delete('/profile-picture', removeProfilePicture);
export default router;