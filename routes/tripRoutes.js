import express from 'express';
import {
  createTrip,
  getAllTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  getUpcomingTrips,
  getTripStats
} from '../controllers/tripController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { validateTrip } from '../middlewares/validation.js';

const router = express.Router();

// All routes are protected
router.use(authenticateToken);

// Trip routes
router.post('/', validateTrip, createTrip);
router.get('/', getAllTrips);
router.get('/upcoming', getUpcomingTrips);
router.get('/stats', getTripStats);
router.get('/:id', getTripById);
router.put('/:id', validateTrip, updateTrip);
router.delete('/:id', deleteTrip);

export default router;