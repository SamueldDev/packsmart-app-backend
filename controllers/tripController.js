

import Trip from "../models/TripModel.js";

import { Op } from "sequelize";


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
     const { startDate, endDate } = req.query;

    const where = { userId: req.user.id };
   


    if (startDate && endDate) {
      where.startDate = { [Op.gte]: startDate };
      where.endDate = { [Op.lte]: endDate };
    }

     console.log("WHERE:", where);
     console.log("Query Params:", req.query);


    const trips = await Trip.findAll();
    res.json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch trips", error: error.message });
  }
};
