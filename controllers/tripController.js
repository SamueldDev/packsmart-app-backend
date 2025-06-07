// import { Trip } from '../models/tripModel.js';
// import { asyncHandler } from '../middlewares/errorHandler.js';

// export const createTrip = asyncHandler(async (req, res) => {
//   const { destination, start_date, end_date, purpose, notes } = req.body;

//   const trip = await Trip.create({
//     user_id: req.user.id,
//     destination,
//     start_date,
//     end_date,
//     purpose,
//     notes
//   });

//   res.status(201).json({
//     message: 'Trip created successfully',
//     trip
//   });
// });

// export const getAllTrips = asyncHandler(async (req, res) => {
//   const trips = await Trip.findByUserId(req.user.id);

//   res.json({
//     trips,
//     count: trips.length
//   });
// });

// export const getTripById = asyncHandler(async (req, res) => {
//   const { id } = req.params;
  
//   const trip = await Trip.findById(id, req.user.id);

//   if (!trip) {
//     return res.status(404).json({ error: 'Trip not found' });
//   }

//   res.json({ trip });
// });

// export const updateTrip = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const { destination, start_date, end_date, purpose, notes } = req.body;

//   const trip = await Trip.update(id, req.user.id, {
//     destination,
//     start_date,
//     end_date,
//     purpose,
//     notes
//   });

//   if (!trip) {
//     return res.status(404).json({ error: 'Trip not found' });
//   }

//   res.json({
//     message: 'Trip updated successfully',
//     trip
//   });
// });

// export const deleteTrip = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   const trip = await Trip.delete(id, req.user.id);

//   if (!trip) {
//     return res.status(404).json({ error: 'Trip not found' });
//   }

//   res.json({
//     message: 'Trip deleted successfully',
//     trip
//   });
// });

// export const getUpcomingTrips = asyncHandler(async (req, res) => {
//   const trips = await Trip.getUpcoming(req.user.id);

//   res.json({
//     trips,
//     count: trips.length
//   });
// });

// export const getTripStats = asyncHandler(async (req, res) => {
//   const allTrips = await Trip.findByUserId(req.user.id);
//   const upcomingTrips = await Trip.getUpcoming(req.user.id);
  
//   const now = new Date();
//   const pastTrips = allTrips.filter(trip => new Date(trip.end_date) < now);
//   const currentTrips = allTrips.filter(trip => 
//     new Date(trip.start_date) <= now && new Date(trip.end_date) >= now
//   );

//   res.json({
//     stats: {
//       total: allTrips.length,
//       upcoming: upcomingTrips.length,
//       current: currentTrips.length,
//       past: pastTrips.length
//     }
//   });
// });