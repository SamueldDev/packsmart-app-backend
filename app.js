import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { sequelize } from './config/database.js';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';
import { generalLimiter } from './middlewares/rateLimiter.js';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const PORT = process.env.PORT || 3000;

// Route imports
import userRoutes from './routes/userRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import packingListRoutes from './routes/packingListRoutes.js';
import packingItemRoutes from './routes/packingItemRoutes.js';

const app = express();

// Security middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
// Specific rate limiting for auth routes
const authLimiter = rateLimit({
  max: 10,
  windowMs: 15 * 60 * 1000, // 15 minutes
  message: 'Too many authentication attempts, please try again later!',
  skipSuccessfulRequests: true
});
// app.use('/api/auth', authLimiter);
app.use('/api/auth/reset-password', authLimiter);
app.use('/api/auth/change-password', authLimiter);
app.use(generalLimiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Compression middleware
app.use(compression());

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/lists', packingListRoutes);
app.use('/api', packingItemRoutes);

// Serve static files
app.use(express.static(join(__dirname, 'public')));
app.use('/img', express.static(join(__dirname, 'public/img')));
app.use('/uploads', express.static(join(__dirname, 'public/uploads')));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});


// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

sequelize
  .sync({ alter: true })
  .then(() => {
   app.listen(PORT, () => {
      console.log(`SmartPack API server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
  })
  .catch((err) => {
    console.log("Error syncing database: ", err);
  });