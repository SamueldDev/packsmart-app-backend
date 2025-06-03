
import express from "express"
import { getSuggestions } from "../services/suggestions.js";

const router = express.Router();

router.post('/', (req, res) => {
  const { destinationTypes } = req.body;

  if (!Array.isArray(destinationTypes) || destinationTypes.length === 0) {
    return res.status(400).json({ error: 'destinationTypes (array) is required' });
  }

  const suggestions = getSuggestions({ destinationTypes });

  res.json({ suggestions });
});

export default router;