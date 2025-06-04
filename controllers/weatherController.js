



import Trip from "../models/TripModel.js";
import { fetchWeather } from "../utilis/fetchWeather.js";

export const weatherForecast = async (req, res) => {
  const { tripId } = req.query;

  if (!tripId) {
    return res.status(400).json({ error: 'tripId is required' });
  }

  try {
    const trip = await Trip.findByPk(tripId);

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    const city = trip.destinationCity;
    const country = trip.destinationCountry;

    if (!city || !country) {
      return res.status(400).json({ error: 'Trip destination city or country is missing' });
    }

    const weatherData = await fetchWeather(city, country, trip.startDate);

    res.json({
      destination: `${city}, ${country}`,
      startDate: trip.startDate,
      forecast: weatherData,
    });
  } catch (error) {
    console.error('Weather alert error:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};

