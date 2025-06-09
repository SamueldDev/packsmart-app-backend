

import express from "express"


import { createTrip, getTrips, getRecentTrips  } from "../controllers/tripController.js"
// import authenticate from "../middlewares/authMiddleware.js"
import { protectedAction } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.post("/", protectedAction, createTrip)
router.get("/", protectedAction, getTrips)
router.get("/recent", protectedAction, getRecentTrips)

export default router

