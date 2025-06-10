




import express from "express";

import { weatherForecast } from "../controllers/weatherController.js";
import { protectedAction } from "../middlewares/authMiddleware.js";

const router = express.Router(); 


router.get("/", protectedAction, weatherForecast)

export default router