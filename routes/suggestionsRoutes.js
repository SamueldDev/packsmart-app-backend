
import express from "express"

import { taggedSuggestions } from "../controllers/suggestionController.js";
import { protectedAction } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post('/', protectedAction,  taggedSuggestions)

export default router;