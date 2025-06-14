

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModel.js";


dotenv.config();


export const createUser = async (req, res) => {
    const { email, password, name, phoneNumber, preferences } = req.body

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({ where: { email: normalizedEmail } });

    if(existingUser){
        return res.status(404).json({
            status: false,
            message: "email has already been used",
            data: []
        })
    }

    const hashed_password = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email:normalizedEmail, phoneNumber, preferences, password:hashed_password})

    if(!user){
        return res.status(400).json({
            status: false,
            message: "could not create a user",
            data: []

        })
    }

    return res.status(200).json({
        status : true,
        message: "User created successfully",
        data: user
    })
}



// log a user in
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = email.toLowerCase().trim();

  const user = await User.findOne({ where: { email: normalizedEmail } });

  if (!user) {
    return res.status(401).json({
      status: false,
      message: "Invalid email or password",
      data: [],
    });
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    return res.status(401).json({
      status: false,
      message: "Invalid email or password",
      data: [],
    });
  }

  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role
  };

  const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  payload.token = token;

  return res.status(200).json({
    status: true,
    message: "Login successful",
    data: payload,
  });
};









// Get all users
// export const getUsers = async (req, res) => {
//   try {
//     const users = await User.findAll();
//     res.json(users);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to fetch users", error: error.message });
//   }
// };
