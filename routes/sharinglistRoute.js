


import express from "express";

import { 
    createShareableLink,
    getSharedListByToken,
    revokeSharedList 
} from "../controllers/sharinglistController.js";

import authenticate from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authenticate, createShareableLink);

router.delete("/:id", authenticate, revokeSharedList);

router.get("/:token", getSharedListByToken);

export default router;
