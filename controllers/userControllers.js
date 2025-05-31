



import User from "../models/userModel.js";

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { fullname, email, preferences } = req.body;
    const newUser = await User.create({ fullname, email, preferences });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create user", error: error.message });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
};
