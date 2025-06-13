

import Trip from "../models/TripModel.js";

import { Op } from "sequelize";


// Create a new trip
export const createTrip = async (req, res) => {
  try {
    const userId = req.user.id
    const { name, destination, tripType, destinationCity, destinationCountry, tags, startDate, endDate, duration, metadata } = req.body;
    const newTrip = await Trip.create({ userId, name, destination, tripType, destinationCountry, tags, destinationCity, startDate, endDate, duration, metadata });
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

    const userId = req.user.id

    const where = { userId };

   
    if (startDate && endDate) {
    where.startDate = { [Op.lte]: endDate };
    where.endDate = { [Op.gte]: startDate };
    }

    console.log("WHERE:", where);

    const trips = await Trip.findAll({ where });

   
    res.json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch trips", error: error.message });
  }
};



// get recent trips
export const getRecentTrips = async (req, res) => {
  const userId = req.user.id
  const limit = parseInt(req.query.limit, 10) || 3; 

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  try {
    const trips = await Trip.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      limit,
    });

    res.json({ recentTrips: trips });
  } catch (error) {
    console.error('Error fetching recent trips:', error);
    res.status(500).json({ error: 'Failed to fetch recent trips' });
  }
};













 //     trips.forEach(t => {
    //     console.log(`Trip: ${t.destination}, Start: ${t.startDate}, End: ${t.endDate}`);

    // });


