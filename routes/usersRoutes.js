

import express from "express";
//import User from "../models/userModel.js";


import User from "../models/UsersModel.js";
// import User from "../models/UserModel.js";


const router = express.Router();

// Create user (for demo)
router.post("/", async (req, res) => {
  try {
    const { email, preferences } = req.body;
    const user = await User.create({ email, preferences });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
