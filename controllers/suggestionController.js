

import { getSuggestions } from "../services/suggestions.js";


export const taggedSuggestions = async (req, res) => {
  const { destinationTypes } = req.body;

  if (!Array.isArray(destinationTypes) || destinationTypes.length === 0) {
    return res.status(400).json({ error: 'destinationTypes (array) is required' });
  }

  const suggestions = getSuggestions({ destinationTypes });

  res.json({ suggestions });
}