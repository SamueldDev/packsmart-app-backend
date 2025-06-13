

import { getSuggestions } from "../services/suggestions.js";

import { SUGGESTION_DB } from "../services/suggestions.js "

import Trip from "../models/TripModel.js";

export const taggedSuggestions = async (req, res) => {
  const { tripId } = req.body;

  if (!tripId) {
    return res.status(400).json({ error: "tripId is required" });
  }

  const trip = await Trip.findByPk(tripId);

  if (!trip) {
    return res.status(404).json({ error: "Trip not found" });
  }

  const destinationTypes = trip.tags || [];
  const suggestions = getSuggestions({ destinationTypes });

  return res.status(200).json({ suggestions });
};





export const manualTagSuggestions = async (req, res) => {
  const { tag } = req.query;

  if (!tag) {
    return res.status(400).json({ error: "Tag is required (e.g. ?tag=beach)" });
  }

  const suggestions = SUGGESTION_DB[tag.toLowerCase()];

  if (!suggestions) {
    return res.status(404).json({ error: `No suggestions found for tag '${tag}'` });
  }

  return res.status(200).json({ tag, suggestions });
};
