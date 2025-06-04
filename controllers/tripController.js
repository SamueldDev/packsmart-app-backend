

import Trip from "../models/TripModel.js";

import { Op } from "sequelize";


// Create a new trip
export const createTrip = async (req, res) => {
  try {
    const { userId, name, tripType, destination, destinationCity, destinationCountry, startDate, endDate, duration, metadata } = req.body;
    const newTrip = await Trip.create({ userId, name, tripType, destination, destinationCountry, destinationCity, startDate, endDate, duration, metadata });
    res.status(201).json(newTrip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create trip", error: error.message });
  }
};

// Get all trips
export const getTrips = async (req, res) => {
  try {
     const { startDate, endDate } = req.query;

     const where = { userId: req.user.id };
   
      if (startDate && endDate) {
    where.startDate = { [Op.lte]: endDate };
    where.endDate = { [Op.gte]: startDate };
    }

     console.log("WHERE:", where);

    const trips = await Trip.findAll();

    trips.forEach(t => {
  console.log(`Trip: ${t.destination}, Start: ${t.startDate}, End: ${t.endDate}`);
});
    res.json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch trips", error: error.message });
  }
};



// get recent trips
export const getRecentTrips = async (req, res) => {
  const { userId, limit = 3 } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  try {
    const trips = await Trip.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit, 10),
    });

    res.json({ recentTrips: trips });
  } catch (error) {
    console.error('Error fetching recent trips:', error);
    res.status(500).json({ error: 'Failed to fetch recent trips' });
  }
};