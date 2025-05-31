

import express from "express";

import User from "../models/userModel.js";

// import User from "../models/userModel.js";
import Trip from "../models/TripModel.js";


// import Trip from "../models/TripModel.js";
// import User from "../models/UserModel.js";


const router = express.Router();

// Create trip for user
router.post("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { tripType, destination, duration, metadata } = req.body; 

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const trip = await Trip.create({ userId, tripType, destination, duration, metadata });
    res.status(201).json(trip);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
