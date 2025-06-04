




import express from "express";

import { weatherForcast } from "../controllers/weatherController.js";

const router = express.Router(); 


router.get("/", weatherForcast)

export default router