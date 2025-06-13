
import express from "express"

import { taggedSuggestions, manualTagSuggestions } from "../controllers/suggestionController.js";
import { protectedAction } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post('/', protectedAction,  taggedSuggestions)

router.get('/', protectedAction, manualTagSuggestions); // e.g., /api/suggestions?tag=camping

export default router;