
import express from "express"

import { taggedSuggestions } from "../controllers/suggestionController.js";

// import authenticate from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/',  taggedSuggestions)

export default router;