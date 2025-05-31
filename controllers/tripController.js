

import Trip from "../models/TripModel.js";

// Create a new trip
export const createTrip = async (req, res) => {
  try {
    const { userId, name, tripType, destination, startDate, endDate, duration, metadata } = req.body;
    const newTrip = await Trip.create({ userId, name, tripType, destination, startDate, endDate, duration, metadata });
    res.status(201).json(newTrip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create trip", error: error.message });
  }
};

// Get all trips
export const getTrips = async (req, res) => {
  try {
    const trips = await Trip.findAll();
    res.json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch trips", error: error.message });
  }
};
