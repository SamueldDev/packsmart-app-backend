


import express from "express";

import { 
    createShareableLink,
    getSharedListByToken,
    revokeSharedList 
} from "../controllers/sharinglistController.js";

import { sharedListRateLimiter } from "../middlewares/rateLimiterMiddleware.js";
import { protectedAction } from "../middlewares/authMiddleware.js";

// import authenticate from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protectedAction,  createShareableLink);

router.delete("/:id", protectedAction, revokeSharedList);


router.get("/:token", sharedListRateLimiter, getSharedListByToken);

export default router;
