import { Trip } from '../models/tripModel.js';
import { asyncHandler } from '../middlewares/errorHandler.js';
import { Op } from 'sequelize';

// Create a new trip
export const createTrip = asyncHandler(async (req, res) => {
  const { destination, start_date, end_date, purpose, tripType } = req.body;

  const trip = await Trip.create({
    user_id: req.user.id,
    destination,
    start_date,
    end_date,
    purpose,
    tripType,
  });

  res.status(201).json({
    message: 'Trip created successfully',
    trip
  });
});

// Get all trips for a user
export const getAllTrips = asyncHandler(async (req, res) => {
  const trips = await Trip.findAll({
    where: { user_id: req.user.id },
    order: [['start_date', 'DESC']]
  });

  res.json({
    trips,
    count: trips.length
  });
});

// Get a single trip by ID
export const getTripById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const trip = await Trip.findOne({
    where: { id, user_id: req.user.id }
  });

  if (!trip) {
    return res.status(404).json({ error: 'Trip not found' });
  }

  res.json({ trip });
});

// Update a trip
export const updateTrip = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { destination, start_date, end_date, purpose, tripType } = req.body;

  const trip = await Trip.findOne({
    where: { id, user_id: req.user.id }
  });

  if (!trip) {
    return res.status(404).json({ error: 'Trip not found' });
  }

  await trip.update({
    destination,
    start_date,
    end_date,
    purpose,
    tripType
  });

  res.json({
    message: 'Trip updated successfully',
    trip
  });
});

// Delete a trip
export const deleteTrip = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const trip = await Trip.findOne({
    where: { id, user_id: req.user.id }
  });

  if (!trip) {
    return res.status(404).json({ error: 'Trip not found' });
  }

  await trip.destroy();

  res.json({
    message: 'Trip deleted successfully',
    trip
  });
});

// Get upcoming trips
export const getUpcomingTrips = asyncHandler(async (req, res) => {
  const trips = await Trip.findAll({
    where: {
      user_id: req.user.id,
      start_date: { [Op.gte]: new Date() }
    },
    order: [['start_date', 'ASC']]
  });

  res.json({
    trips,
    count: trips.length
  });
});

// Get trip statistics
export const getTripStats = asyncHandler(async (req, res) => {
  const allTrips = await Trip.findAll({
    where: { user_id: req.user.id }
  });

  const now = new Date();

  const pastTrips = allTrips.filter(trip => new Date(trip.end_date) < now);
  const currentTrips = allTrips.filter(trip =>
    new Date(trip.start_date) <= now && new Date(trip.end_date) >= now
  );
  const upcomingTrips = allTrips.filter(trip => new Date(trip.start_date) > now);

  res.json({
    stats: {
      total: allTrips.length,
      upcoming: upcomingTrips.length,
      current: currentTrips.length,
      past: pastTrips.length
    }
  });
});
