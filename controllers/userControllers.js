



import User from "../models/userModel.js";


// Create a new user
// export const createUser = async (req, res) => {
//   try {
//     const { fullname, email, phoneNumber, preferences } = req.body;
//     const newUser = await User.create({ fullname, email, phoneNumber, preferences });
//     res.status(201).json(newUser);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to create user", error: error.message });
//   }
// };


// user with password
export const createUser = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, preferences, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = await User.create({ fullname, email, phoneNumber, preferences, password });

    res.status(201).json({
      message: "User created",
      user: {
        id: newUser.id,
        fullname: newUser.fullname,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        preferences: newUser.preferences,
      },
    });
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
