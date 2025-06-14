

import { forgotPassword, resetPassword, changePassword } from "../controllers/authController.js";
import { protectedAction } from "../middlewares/authMiddleware.js";
import { forgotLimiter } from "../middlewares/rateLimiterMiddleware.js"
import express from "express"


const router = express.Router()

router.post("/forgot-password", forgotLimiter, forgotPassword)
router.post("/reset-password/:token", resetPassword)

router.post("/change-password", protectedAction, changePassword)



export default router