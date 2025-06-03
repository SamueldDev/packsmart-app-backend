

import express from "express"


import { createTrip, getTrips } from "../controllers/tripController.js"
import authenticate from "../middlewares/authMiddleware.js"

const router = express.Router()

router.post("/", authenticate, createTrip)
router.get("/", authenticate, getTrips)

export default router

