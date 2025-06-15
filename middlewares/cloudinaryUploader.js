


import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../config/cloudinary.js";

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "packsmart-images", // optional folder name on Cloudinary
//     allowed_formats: ["jpg", "jpeg", "png"],
//     transformation: [{ width: 500, height: 500, crop: "limit" }]
//   }
// });

// const upload = multer({ storage });

// export default upload;


// middleware/upload.js



// Store uploaded files in memory (buffer)


const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // optional: 5MB max file size
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

export default upload;
