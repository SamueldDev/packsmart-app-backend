

import express from "express"


import { createTrip, getTrips, getRecentTrips  } from "../controllers/tripController.js"
// import authenticate from "../middlewares/authMiddleware.js"

const router = express.Router()

router.post("/", createTrip)
router.get("/", getTrips)
router.get("/recent", getRecentTrips)

export default router

