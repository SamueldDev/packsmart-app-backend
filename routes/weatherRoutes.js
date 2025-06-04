




import express from "express";

import { weatherForecast } from "../controllers/weatherController.js";

const router = express.Router(); 


router.get("/", weatherForecast)

export default router