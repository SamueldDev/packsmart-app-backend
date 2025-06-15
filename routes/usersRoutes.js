

import express from "express";
import { uploadProfileImage } from "../controllers/userControllers.js";
import upload from "../middlewares/cloudinaryUploader.js";
import { createUser, loginUser} from "../controllers/userControllers.js";
import { registerValidator, validationResultMiddleware, loginValidator } from "../middlewares/validateMiddleware.js"
import { protectedAction } from "../middlewares/authMiddleware.js";


const router = express.Router(); 

router.post("/register", registerValidator, validationResultMiddleware,  createUser)
router.post("/login", loginValidator, validationResultMiddleware, loginUser)
router.post("/upload-profile-pic", protectedAction, upload.single("image"), uploadProfileImage)



// router.get("/", getUsers)

export default router



