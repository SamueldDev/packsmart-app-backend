



import Trip from "../models/TripModel.js";
import { fetchWeather } from "../utilis/fetchWeather.js";

export const weatherForcast = async (req, res) => {
  const { tripId } = req.query;

  if (!tripId) {
    return res.status(400).json({ error: 'tripId is required' });
  }

  try {
    const trip = await Trip.findByPk(tripId);

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }



    const weatherData = await fetchWeather(trip.destinationCity, trip.destinationCountry, trip.startDate);
    res.json({
    
      destination: `${trip.destinationCity}, ${trip.destinationCountry}`,
      startDate: trip.startDate,
      forecast: weatherData,
    });
  } catch (error) {
    console.error('Weather alert error:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
}

