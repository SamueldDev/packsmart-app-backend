

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







// upload a picture adnd change profile image
import cloudinary from "../config/cloudinary.js";

// export const uploadProfileImage = async (req, res) => {
//   try {
//     const user = await User.findByPk(req.user.id);

//     if (!req.file) {
//       return res.status(400).json({ message: "No image uploaded" });
//     }

//     // Delete old image from Cloudinary
//     if (user.cloudinaryPublicId) {
//       await cloudinary.uploader.destroy(user.cloudinaryPublicId);
//     }

//     // Save new image details
//     user.profileImage = req.file.path; // Cloudinary URL
//     user.cloudinaryPublicId = req.file.filename; // unique Cloudinary ID
//     await user.save();

//     res.json({ message: "Profile image updated", imageUrl: user.profileImage });
//   } catch (error) {
//     console.error("Image Upload Error:", error);
//     res.status(500).json({ message: "Failed to upload image" });
//   }
// };

import streamifier from "streamifier"

export const uploadProfileImage = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    // Upload buffer to Cloudinary using stream
    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "packsmart/users",
            public_id: `user_${user.id}_${Date.now()}`,
            resource_type: "image",
          },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });
    };

    // Delete old image if exists
    if (user.cloudinaryPublicId) {
      await cloudinary.uploader.destroy(user.cloudinaryPublicId);
    }

    const uploadResult = await uploadToCloudinary();

    // Save new image URL and public ID
    user.profileImage = uploadResult.secure_url;
    user.cloudinaryPublicId = uploadResult.public_id;
    await user.save();

    res.json({
      message: "Profile image updated successfully",
      imageUrl: user.profileImage,
    });
  } catch (error) {
    console.error("Image Upload Error:", error);
    res.status(500).json({ 
      message: "Failed to upload image",
      errors: error
    });
  }
};

