
import express from "express"

import { taggedSuggestions } from "../controllers/suggestionController.js";

import authenticate from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/', authenticate, taggedSuggestions)

export default router;